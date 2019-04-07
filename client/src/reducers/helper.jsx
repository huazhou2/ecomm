
//some helper functions

export const combineArrays = (prod1, prod2) => {
  prod1 = prod1 || [];
  prod2 = prod2 || [];
  if (prod1.length === 0) return prod2;
  if (prod2.length === 0) return prod1;

  var products = [...prod2];
   prod1.forEach((product)=> {
    var foundIndex = products.findIndex(
      x =>
        x.name === product.name &&
        x.size === product.size &&
        x.color === product.color,
    );
	   if (foundIndex !== -1)
      products[foundIndex].quantity =
        +products[foundIndex].quantity + +product.quantity;
    else products.push(product);
  });
  return products;
};
