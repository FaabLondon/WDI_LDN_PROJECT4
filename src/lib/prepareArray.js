import _ from 'lodash';

//generates array of unique Ids, then creates an array of object/items that counts how many times an item is in the shopping cart
const prepareArray = (data) => {
  //generates an array with distinct Ids
  const uniqueIdArr = Array.from(new Set(data.map(item => item._id))).sort();

  //for each unique item, calculates the qty in the cart return an array of all items with qty.
  const newArrQtyId = uniqueIdArr.map(elt => {
    const qtyId = _.filter(data, item => item._id === elt ).length;
    const foundElt = data.find(item => item._id === elt);
    return Object.assign({}, {qty: qtyId }, foundElt );
  });

  return newArrQtyId;

};

export default prepareArray;
