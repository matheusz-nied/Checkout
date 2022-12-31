import express from "express";
import { router } from "./routes";
import { logger } from "./util/logger";
import  cors from "cors";


const app = express();

const corsOptions: cors.CorsOptions = {

   //origin: "http://127.0.0.1:5500/",
    origin: "*",
     
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running at ${process.env.PORT}`);
});
