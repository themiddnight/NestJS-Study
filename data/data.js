const products = [
  { id: 1, cat_id: 1, name: 'Phone', price: 199 },
  { id: 2, cat_id: 1, name: 'Tablet', price: 299 },
  { id: 3, cat_id: 1, name: 'Labtop', price: 399 },
  { id: 4, cat_id: 2, name: 'Apple', price: 99 },
  { id: 5, cat_id: 2, name: 'Bag', price: 49 },
  { id: 6, cat_id: 3, name: 'Bread', price: 14 },
];

const categories = [
  { id: 1, name: 'Electronic' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Luxuary' },
];

module.exports = { products, categories };
