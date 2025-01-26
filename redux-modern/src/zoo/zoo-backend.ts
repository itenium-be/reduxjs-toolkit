import { http, HttpResponse, delay } from "msw";
import { setupWorker } from "msw/browser";
import { zoos } from "./db/zoos";
import { Visitor } from "./MythicalZoo";
import { visitors } from "./db/visitors";

// Using https://mswjs.io/ to serve the JSON as a "backend"
// With WebWorker:
// npx msw init ./public --save

const wait = () => delay(2000);

export type ApiResponse<T> = {
  data: T;
  links?: {
    self: string;
    next?: string;
    previous?: string;
  }
}

export const handlers = [
  http.get('/api/zoos', async () => {
    await wait();

    // Uncomment to make the backend "crash"
    // return HttpResponse.error();

    return HttpResponse.json(zoos.map(zoo => ({
      id: zoo.id,
      name: zoo.name,
      rating: zoo.rating,
      desc: zoo.desc,
    })));
  }),

  http.get('/api/zoos/:id', async ({ params }) => {
    await wait();

    const fullZoo = zoos.find(x => x.id === Number(params.id));
    return HttpResponse.json({
      // Sometimes you have a backend that
      // wraps the actual response somehow

      // This is handled in zoo-api.ts with transformResponse
      data: fullZoo,
      links: {
        self: `/api/zoos/${params.id}`
      }
    })
  }),

  http.post('/api/zoos/:id', async ({ params, request }) => {
    const zooId = Number(params.id);
    const visitor = await request.json() as Visitor;
    const zoo = zoos.find(x => x.id === zooId);
    if (zoo) {
      visitor.id = visitors.length + 1;
      visitor.favoriteCreatures = [];
      zoo.visitors.push(visitor);
      visitors.push(visitor);
    }

    return HttpResponse.json({
      data: zoo
    });
  }),
];

export const worker = setupWorker(...handlers);
