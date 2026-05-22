const categories = [
  'Office Supply',
  'Medical Supply',
  'Electronics',
  'Furniture',
  'Asset',
  'Consumable',
];

function getStatus(quantity: number) {
  if (quantity === 0) return 'Out of Stock';
  if (quantity >= 1 && quantity <= 10) return 'Critical';
  if (quantity >= 11 && quantity <= 30) return 'Low Stock';

  return 'Normal';
}

export const inventoryData = Array.from({ length: 500 }, (_, index) => {
  const quantity = Math.floor(Math.random() * 50);

  return {
    id: index.toString(),
    itemName: `Item ${index + 1}`,
    category:
      categories[Math.floor(Math.random() * categories.length)],
    quantity,
    price: (Math.random() * 1000).toFixed(2),
    status: getStatus(quantity),
  };
});