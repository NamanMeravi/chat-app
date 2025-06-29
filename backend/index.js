import express from "express";
import dotenv from "dotenv";
import { dbconnect } from "./connection/dbconnection.js";
import router from "./routes/user.routes.js";
import chatroute from "./routes/chat.route.js";
dotenv.config();
import cors from 'cors'
const PORT = process.env.PORT || 4000;
const app = express();


app.use(cors())

app.use(express.json());

app.use("/api/user", router);

app.use('/api/chat',chatroute)


app.listen(PORT, () => {
  try {
    dbconnect();

    console.log(`server is running on port ${PORT}`);
  } catch (error) {}
});
