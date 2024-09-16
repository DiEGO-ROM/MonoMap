import express from "express"
import { envs } from "./utils/dontenv";
import AppRouter from "./router/app-router";
import { MongoDatabase } from "./db/connection";
import { EmailJob } from "./jobs/email.jobs";

const app = express();

(async () => await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB}))();
app.use(express.json())

app.use("/", AppRouter.routes)

app.listen(envs.PORT, ()=>{
  console.log(`Server is running on port ${envs.PORT}`)
  EmailJob()
})