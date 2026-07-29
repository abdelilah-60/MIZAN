import { Hono } from "hono";
import { prisma } from "../lib/prisma";

export const notificationsRoute = new Hono();

// GET /api/notifications - List user's notifications
notificationsRoute.get("/", async (c) => {
  const payload = c.get("jwtPayload");

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    prisma.notification.count({
      where: { userId: payload.userId, isRead: false },
    }),
  ]);

  return c.json({
    status: "success",
    unreadCount,
    notifications,
  });
});

// PUT /api/notifications/read-all - Mark all notifications as read
notificationsRoute.put("/read-all", async (c) => {
  const payload = c.get("jwtPayload");

  await prisma.notification.updateMany({
    where: { userId: payload.userId, isRead: false },
    data: { isRead: true },
  });

  return c.json({ status: "success" });
});

// PUT /api/notifications/:id/read - Mark single notification as read
notificationsRoute.put("/:id/read", async (c) => {
  const payload = c.get("jwtPayload");
  const id = c.req.param("id");

  const notification = await prisma.notification.findFirst({
    where: { id, userId: payload.userId },
  });

  if (!notification) {
    return c.json({ error: "Notification not found" }, 404);
  }

  await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });

  return c.json({ status: "success" });
});
