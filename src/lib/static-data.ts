import { randomOrder } from "./generator";

export const staticCustomers: {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  postalCode: string;
  email: string;
  phone: string;
  membership: "bronze" | "silver" | "gold";
  joinedAt: string;
}[] = JSON.parse(process.env.CUSTOMERS_JSON ?? "[]");

export const staticProducts: {
  id: string;
  name: string;
  category: string;
  price: number;
}[] = JSON.parse(process.env.PRODUCTS_JSON ?? "[]");

export const staticOrder1 = randomOrder(
  [staticProducts[2]],
  [staticCustomers[1]]
);

export const staticOrder2 = randomOrder(
  [
    {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Invalid product",
    },
  ],
  [[staticCustomers[0]]]
);

export const staticOrder3 = randomOrder(
  [staticProducts[1]],
  [
    {
      id: "00000000-0000-0000-0000-000000000000",
      firstName: "Invalid",
      lastName: "customer",
    },
  ]
);

export const staticOrders = [staticOrder1, staticOrder2, staticOrder3];
