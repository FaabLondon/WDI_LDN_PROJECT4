//calculte the content of the cart
const calcCartContent = (newArrQtyId) => {

  const pricePerDay = newArrQtyId.reduce((acc, elt) => acc += elt.rentalPrice, 0);
  const subTotal = newArrQtyId.reduce((acc, elt) => acc = acc + (elt.rentalPrice * elt.qty), 0);
  const objCartContent = Object.assign({}, { pricePerDay, subTotal });
  return objCartContent;

};

export default calcCartContent;
