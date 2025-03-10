import { zValidator } from "@hono/zod-validator";
import { Prisma, TripType } from "@prisma/client";
import { Hono } from "hono";
import * as z from "zod";
import { paginationObject } from "../utils/prisma-pagination";
import { getPrisma } from "../utils/prismaFunction";
import { queryPaginationSchema } from "../utils/query-validator";

const trips = new Hono();
const tripsQuerySchema = queryPaginationSchema.extend({
});
trips.get("/", zValidator("query", tripsQuerySchema), async (c) => {
  const prisma = getPrisma(Bun.env.DATABASE_URL!);
  const { q, ...pagination } = c.req.valid("query");
  const where: Prisma.TripWhereInput = {
    departure: { contains: q },
    arrival: { contains: q },
  };

  const [trips, count] = await prisma.$transaction([
    prisma.trip.findMany({
      where,
      ...paginationObject(pagination),
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        departure: true,
        arrival: true,
        startTime: true,
        endTime: true,
        tripType: true,
        expenses: true,
        createdAt: true,
        updatedAt: true,
        vehicle: true,
        driver: true,
        client: true,
      },
    }),
    prisma.trip.count({ where }),
  ]);

  return c.json({
    meta: {
      ...pagination,
      total: count,
    },
    data: trips,
  });
});

trips.get("/:id", async (c) => {
  const prisma = getPrisma(Bun.env.DATABASE_URL!);
  const id = c.req.param("id");
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: { vehicle: true, driver: true, client: true },
  });

  if (!trip) {
    return c.json({ message: "Trip not found" }, 404);
  }

  return c.json(trip);
});

trips.post(
  "/",
  zValidator(
    "json",
    z.object({
      vehicleId: z.string(),
      driverId: z.string(),
      clientId: z.string().optional(),
      departure: z.string(),
      arrival: z.string(),
      startTime: z.coerce.date(),
      endTime: z.coerce.date().optional(),
      tripType: z.nativeEnum(TripType),
    })
  ),
  async (c) => {
    const prisma = getPrisma(Bun.env.DATABASE_URL!);
    const {
      vehicleId,
      driverId,
      clientId,
      departure,
      arrival,
      startTime,
      endTime,
      tripType,
    } = c.req.valid("json");

    const newTrip = await prisma.trip.create({
      data: {
        vehicleId,
        driverId,
        clientId,
        departure,
        arrival,
        startTime,
        endTime,
        tripType,
      },
    });

    return c.json(newTrip, 201);
  }
);

trips.patch(
  "/:id",
  zValidator(
    "json",
    z.object({
      vehicleId: z.string().optional(),
      driverId: z.string().optional(),
      clientId: z.string().optional(),
      departure: z.string().optional(),
      arrival: z.string().optional(),
      startTime: z.date().optional(),
      endTime: z.date().optional(),
      tripType: z.nativeEnum(TripType).optional(),
    })
  ),
  async (c) => {
    const prisma = getPrisma(Bun.env.DATABASE_URL!);
    const id = c.req.param("id");
    const trip = await prisma.trip.findUnique({ where: { id } });

    if (!trip) {
      return c.json({ message: "Trip not found" }, 404);
    }

    const updatedData = c.req.valid("json");
    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: updatedData,
    });

    return c.json(updatedTrip);
  }
);

trips.delete("/:id", async (c) => {
  const prisma = getPrisma(Bun.env.DATABASE_URL!);
  const id = c.req.param("id");
  const trip = await prisma.trip.findUnique({ where: { id } });

  if (!trip) {
    return c.json({ message: "Trip not found" }, 404);
  }

  await prisma.trip.delete({ where: { id } });
  return c.json({ message: "Trip deleted" });
});

export default trips;
