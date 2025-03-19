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
      id: "d42abb49-92cb-4284-8e2a-d386c969f69a",
      name: "Invalid product",
    },
  ],
  [[staticCustomers[0]]]
);

export const staticOrder3 = randomOrder(
  [staticProducts[1]],
  [
    {
      id: "6a102b53-14d6-4f12-9530-264a3f746cbc",
      firstName: "Invalid",
      lastName: "customer",
    },
  ]
);

export const staticOrders = [staticOrder1, staticOrder2, staticOrder3];
