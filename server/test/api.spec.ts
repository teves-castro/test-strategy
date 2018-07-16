import * as supertest from "supertest"
import { Server } from "../src/server"
import * as nock from "nock"
import * as uuid from "uuid/v1"

describe("GET /api", () => {
  const apiKey = uuid()
  const createMock = (term: string, items: object[], status: number = 200) =>
    nock("https://www.googleapis.com")
      .get("/youtube/v3/search")
      .query({
        q: term,
        part: "snippet",
        key: apiKey,
        type: "video",
        maxResults: 10,
      })
      .reply(status, { items })

  it("returns an empty list for a not found search", async () => {
    const term = `stuff${Math.random()}`
    const scope = createMock(term, [])

    await supertest(new Server(apiKey).app)
      .get("/api")
      .query({ search: term })
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect([])

    scope.done()
  })

  it.only("returns a list of items for a search term", async () => {
    const term = `stuff${Math.random()}`
    const items = [
      {
        id: {
          videoId: "id1",
        },
        snippet: {
          title: "title1",
          description: "a_desc1",
        },
      },
      {
        id: {
          videoId: "id2",
        },
        snippet: {
          title: "title2",
          description: "description2",
        },
      },
    ]
    const scope = createMock(term, items)

    await supertest(new Server(apiKey).app)
      .get("/api")
      .query({ search: term })
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect([
        { id: "id1", title: "title1", description: "a_desc1", length: 4 },
        { id: "id2", title: "title2", description: "description2", length: 6 },
      ])

    scope.done()
  })

  it("returns 502 response for not ok responses from youtube", async () => {
    const term = `stuff${Math.random()}`
    const scope = createMock(term, [], 500)

    await supertest(new Server(apiKey).app)
      .get("/api")
      .query({ search: term })
      .expect(502)

    scope.done()
  })
})
