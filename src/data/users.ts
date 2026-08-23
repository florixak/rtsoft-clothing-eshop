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
  {
    id: "user-100",
    email: "petra@example.com",
    password: "password123",
    firstName: "Petra",
    lastName: "Svoboda",
    role: "user",
    createdAt: "2026-03-02T09:00:00.000Z",
    updatedAt: "2026-04-05T10:20:00.000Z",
  },
  {
    id: "user-101",
    email: "milan@example.com",
    password: "password123",
    firstName: "Milan",
    lastName: "Horak",
    role: "user",
    createdAt: "2026-03-10T14:30:00.000Z",
    updatedAt: "2026-04-08T09:45:00.000Z",
  },
  {
    id: "user-102",
    email: "katerina@example.com",
    password: "password123",
    firstName: "Kateřina",
    lastName: "Dvorakova",
    role: "user",
    createdAt: "2026-03-18T12:00:00.000Z",
    updatedAt: "2026-04-09T11:15:00.000Z",
  },
];

const PREPARED_USER_EMAILS = [
  "customer@example.com",
  "admin@example.com",
] as const;

const requireUserByEmail = (email: string): MockUser => {
  const user = users.find((entry) => entry.email === email);
  if (!user) {
    throw new Error(`Prepared User ${email} is missing from users`);
  }
  return user;
};

export const preparedUsers = PREPARED_USER_EMAILS.map(requireUserByEmail);
