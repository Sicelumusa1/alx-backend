const express = require('express');
const redis = require('redis');
const util = require('util');

const app = express();
const port = 1245;

const redisClient = redis.createClient();
const getAsync = util.promisify(redisClient.get).bind(redisClient);
const setAsync = util.promisify(redisClient.set).bind(redisClient);

// Handle Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

redisClient.on('ready', () => {
  console.error('Redis client connected');
});

// Ensure the client is not closed unexpectedly
process.on('SIGINT', () => {
 redisClient.quit();
 process.exit();
})

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4},
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
]

// Fetch product by ID
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Route to return the list of products
app.get('/list_products', (req, res) => {
  const response = listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  }));

  res.json(response);
})

// Reserve stock by item ID
async function reserveStockById(itemId, stock) {
  const key = `item.${itemId}`;
  await setAsync(key, stock);
}

// Get the current reserved stock item ID
async function getCurrentReservedStockById(itemId) {
  const key = `item.${itemId}`;
 try{
   const reservedStock = await redisClient.get(key);
   return parseInt(reservedStock, 10) || 0;
 } catch (err) {
   console.error('Error getting reserved stock:', err);
   return 0;
 }
}

// Route to get product details by item ID
app.get('/list_products/:itemId', async (req, res) => {	
 	
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (isNaN(itemId)) {
    return res.status(404).json({ status: 'Invalid item ID'});
  }

  if (!product) {
    return res.status(404).json({ status: 'Product not found'});
  }

 try {
   const currentReservedStock = await getCurrentReservedStockById(itemId);

   const response = {
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: currentReservedStock,
  };

  res.json(response);
 } catch (err) {
   console.error('Error fetching product details:', err);
   res.status(500).json({ status: 'Internal server error' });
 }
});

// Route to reserve a product by item ID
app.get('/reserve_product/:itemId', async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId, 10);

    const product = getItemById(itemId);

    if (isNaN(itemId)) {
      return res.status(404).json({ status: 'Invalid item ID'});
    }

    if (!product) {
      return res.status(404).json({ status: 'Product not found'});
    }

    const currentStock = await getCurrentReservedStockById(itemId);

    if (currentStock <= 0) {
      return res.status(400).json({
        status: 'Not enough stock available',
	itemId: product.id,
      });
    }

    // Reserve one item by decrementing the stock by 1
    await reserveStockById(itemId, currentStock - 1);

    res.json({
      status: 'Reservation confirmed',
      itemId: product.id,
    });
  } catch (err) {
    console.error('Error in /reserve_product/:itemId:', err);
    res.status(500).json({ status: 'Internal server error' })
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
