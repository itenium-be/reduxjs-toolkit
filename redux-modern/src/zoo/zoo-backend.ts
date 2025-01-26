import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { zoos } from "./db/zoos";

// Using https://mswjs.io/ to serve the JSON as a "backend"
// With WebWorker:
// npx msw init ./public --save

const wait = (ms = 2000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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
];

export const worker = setupWorker(...handlers);
