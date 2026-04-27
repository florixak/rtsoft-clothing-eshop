import type { User } from "@/types";

export type MockUser = User & {
  password: string;
};

export const users: MockUser[] = [
  {
    id: "user-42",
    email: "customer@example.com",
    password: "password123",
    firstName: "Anna",
    lastName: "Novak",
    role: "user",
    createdAt: "2026-01-10T09:15:00.000Z",
    updatedAt: "2026-04-10T12:30:00.000Z",
  },
  {
    id: "user-77",
    email: "james@example.com",
    password: "password123",
    firstName: "James",
    lastName: "Taylor",
    role: "user",
    createdAt: "2026-02-14T11:00:00.000Z",
    updatedAt: "2026-04-11T08:45:00.000Z",
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-04-12T14:20:00.000Z",
  },
];
