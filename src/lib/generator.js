import { faker } from '@faker-js/faker'

faker.setDefaultRefDate(new Date());

// function shuffle(array) {
//   let currentIndex = array.length,
//     randomIndex;

//   // While there remain elements to shuffle.
//   while (currentIndex > 0) {
//     // Pick a remaining element.
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// }

// const dateAddDays = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

const convertPhone = (phone) => {
  return phone.replace(/[^0-9]/g, "");
};

export const randomCustomer = () => {
  const joinedAt = faker.date.past({ years: 20 });
  // let lastPurchaseAt = dateAddDays(joinedAt, randomNumber(1, 365));
  let lastPurchaseAt = faker.date.past({ years: 2 });
  if (lastPurchaseAt > new Date()) {
    lastPurchaseAt = null;
  }
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: parseInt(faker.finance.amount({ min: 18, max: 99, precision: 0 })),
    gender: faker.helpers.arrayElement(["F", "M", ""]),
    postalCode: faker.location.zipCode().split("-")[0],
    email: faker.internet.email().toLocaleLowerCase(),
    phone: convertPhone(faker.phone.number().split(" ")[0]),
    membership: faker.helpers.arrayElement(["bronze", "silver", "gold"]),
    joinedAt: joinedAt.toISOString().slice(0, 10),
    // lastPurchaseAt: lastPurchaseAt?.toISOString().slice(0, 10) ?? "",
    // totalSpending: parseFloat(
    //   faker.finance.amount({ min: 100, max: 10000, precision: 2 })
    // ),
    // averageOrderValue: parseFloat(
    //   faker.finance.amount({
    //     min: 10,
    //     max: 1000,
    //     precision: 2,
    //   })
    // ),
    // frequency: parseFloat(
    //   faker.finance.amount({ min: 1, max: 30, precision: 0 })
    // ),
    // preferredCategory: faker.helpers.arrayElement([
    //   "Bread",
    //   "Macaron",
    //   "Pastries",
    //   "Tarte",
    // ]),
    // churned: lastPurchaseAt < dateAddDays(new Date(), -365 * 1),
  };
};

export const randomProduct = () => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    category: faker.helpers.arrayElement(PRODUCTS_CATEGORIES),
    price: parseFloat(faker.finance.amount({ min: 1, max: 100, precision: 2 })),
  };
};

export const randomOrder = (products, customers) => {
  const orderDate = faker.date.past({ years: 2 });
  const selectedProduct = faker.helpers.arrayElement(products);

  return {
    orderNumber: faker.number.int({
      min: 100000,
      max: 999999,
    }),
    customerId: faker.helpers.arrayElement(customers).id,
    orderDate:
      orderDate.toISOString().slice(0, 10) +
      " " +
      orderDate.toTimeString().slice(0, 8),
    productId: selectedProduct.id,
  };
};

const PRODUCTS_CATEGORIES = [
  "Bread",
  "Macaron",
  "Pastries",
  "Tarte",
  "Croissant",
  "Cake",
  "Sandwich",
  "Coffee",
];

// const CNT = {
//   customers: 10,
//   products: 100,
//   orders: 0,
// };

// const main = () => {
//   const db = {};

//   // customers
//   db.customers = faker.helpers.multiple(randomCustomer, {
//     count: CNT.customers,
//   });
//   console.log(db.customers);
//   console.log(`customers: ${db.customers.length}`);

//   // products
//   db.products = faker.helpers.multiple(randomProduct, {
//     count: CNT.products,
//   });
//   console.log(db.products);
//   console.log(`products: ${db.products.length}`);

//   // orders
//   db.orders = [];
//   for (let i = 0; i < CNT.orders; i++) {
//     db.orders.push(randomOrder(db.products, db.customers));
//   }
//   console.log(db.orders[0]);
//   console.log(`orders: ${db.orders.length}`);

//   // write to db.json
//   fs.writeFileSync("./assets/db.json", JSON.stringify(db, null, 2));
//   console.log(`db.json created`);
// };

// main();
