import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import express, {Request, Response} from "express";
import {router} from "@shared/infra/http/routes";

import swaggerDocument from "../../../swagger.json";
import {AppError} from "@shared/errors/AppError";
import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
})

app.listen(3333, () => console.log("Server is running"));
