import * as express from "express"
import Routes from "./router/routes"
import Middleware from "./config/middleware"
import IServer from "./interfaces/ServerInterface"

export class Server implements IServer {
  // set app to be of type express.Application
  public app: express.Application

  constructor(public apiKey: string) {
    this.app = express()
    Middleware.init(this)
    Routes.init(this)
  }
}

// export
// export default new Server().app
