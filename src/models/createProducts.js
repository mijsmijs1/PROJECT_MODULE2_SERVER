const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function createOriginalProducts() {
  const products = [
    {
      name: "Product 1",
      price: 10.99,
      des: "Description of Product 1",
      sellStatus: true,
      destroy: false,
      avatar: "https://example.com/product1.jpg",
    },
    {
      name: "Product 2",
      price: 19.99,
      des: "Description of Product 2",
      sellStatus: true,
      destroy: false,
      avatar: "https://example.com/product2.jpg",
    }

  ];
  return prisma.products.createMany({
    data: products,
  });
}

createOriginalProducts()
  .then((createdProducts) => {
    console.log("Created products:", createdProducts);
  })
  .catch((error) => {
    console.error("Error creating original products:", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });