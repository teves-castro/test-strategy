import * as express from "express"
import ApiRouter from "./Api"
import IServer from "../interfaces/ServerInterface"

export default class Routes {
  static init(server: IServer): void {
    const router: express.Router = express.Router()
    server.app.use("/", router)

    server.app.use("/api", new ApiRouter(server.apiKey).router)
  }
}
