import models from "@models";

const seedProduct = async () => {
  const data = [];
<<<<<<< HEAD
  for (let i = 0; i < 20; i++) {
    data.push({});
  }
  await models.product.bulkCreate(data);
=======
  for (let i = 2; i < 9; i++) {
    data.push({
      productId: Number("102" + i),
      userId: 1,
      quantity: 3,
    });
  }

  await models.cart.bulkCreate(data);
>>>>>>> 3942edc5bc195fd83c21caf2d374a6c7c104c8fb
};

seedProduct();
