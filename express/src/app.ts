import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import morgan from "morgan";

// import { RegisterRoutes } from "../build/routes";
import apiRouter from "./routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(morgan("tiny"));

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  }
);

app.use("/", apiRouter);

app.use(
  "/assets",
  express.static(
    "/Users/czhen/Documents/github/my-react-ts-app/express/dist/assets"
  )
);

app.get("/*", function (req, res) {
  res.sendFile(
    "/Users/czhen/Documents/github/my-react-ts-app/express/dist/index.html"
  );
});
