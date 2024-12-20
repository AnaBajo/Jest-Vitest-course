import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", async () => {
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
      { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }), 
  http.post("http://localhost:3030/order", async () => {
    // add a 100ms pause to give the tests a chance to see the 'loading' state
    await delay(100);
    return HttpResponse.json(
      {orderNumber: 123456},
      {status: 201} //test will pass also without the status
    );
  }),
];