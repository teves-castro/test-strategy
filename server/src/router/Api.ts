import { Router } from "express"
import * as fetch from "isomorphic-fetch"

export default class ApiRouter {
  public router: Router

  constructor(private apiKey: string) {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    this.router.get("/", async (req, res) => {
      const term = req.query.search
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${term}&part=snippet&key=${
          this.apiKey
        }&type=video&maxResults=10`,
      )

      if (response.ok) {
        const { items }: { items: any[] } = await response.json()

        const result = items.map(transform).map(processItem)

        res.json(result)
      } else {
        res.sendStatus(502)
      }
    })

    this.router.post("/", () => {})
  }
}
const transform = (o: any) => ({
  id: o.id.videoId as string,
  title: o.snippet.title as string,
  description: o.snippet.description as string,
})

type Item = ReturnType<typeof transform>
const processItem = (item: Item) => ({
  ...item,
  length: calculate(item),
})

const calculate = (i: Item) => Math.ceil(i.description.length / 2)
