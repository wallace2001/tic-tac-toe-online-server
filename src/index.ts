import express from "express";
import cors from "cors";
import createError from "http-errors";
import path from "path";
import cookieParse from "cookie-parser";
import logger from "morgan";
import router  from "./routes/index";
import { SocketControllers } from "socket-controllers";
import "reflect-metadata";
import Container from "typedi";
import { Server } from "socket.io";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: "*"
}));

app.use("/", router);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

export default app;