import { Router } from "express"

export default class ApiRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    this.router.get("/", (_, res) => {
      res.json({ message: "hello" })
    })
    this.router.post("/", () => {})
  }
}
