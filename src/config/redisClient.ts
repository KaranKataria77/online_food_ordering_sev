// import Redis from "ioredis";

// // Connect to Redis server using environment variables
// const redis = new Redis({
//   host: process.env.REDIS_HOST ?? "localhost",
//   port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
// });

// async function getDataFromCache(req: any, res: any, next: any) {
//   const data = await redis.get("restaurants");
//   if (!data) {
//     next();
//   } else {
//     res.send({
//       data: JSON.parse(data),
//     });
//   }
// }
// export { getDataFromCache, redis };
