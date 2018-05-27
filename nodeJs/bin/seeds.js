const mongoose = require('mongoose');
const Category = require('../models/category');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

const dbName = 'iron-store';
mongoose.connect(`mongodb://localhost/${dbName}`);

Category.collection.drop();


// CATEGORY SEEDS
const categories = [
  {
    name: 'Electronics',
    parent: null
  },
  {
    name: 'Food',
    parent: null
  },
  {
    name: 'Clothes',
    parent: null
  },
  {
    name: 'Movies',
    parent: null
  },
  {
    name: 'Books',
    parent: null
  },// END OF PARENT CATEGORIES

]





const childCategories = [
  {
    // electronic
    name: 'TVs'
  },
  {
    // electronic
    name: 'Video Game Consoles' 
  },
  {
    // electronic
    name: 'Cellphones'
  },
  {
    // Food
    name: 'Fruits'
  },
  {
    // Food
    name: 'Snacks'
  },
  {
    // Food
    name: 'Meat'
  },
  {
    // Clothes
    name: 'Shirts'
  },
  {
    // Clothes
    name: 'Pants'
  },
  {
    // Clothes
    name: 'Underwear'
  },
  {
    // Movies
    name: 'Romance'
  },
  {
    // Movies
    name: 'Horror'
  },
  {
    // Movies
    name: 'ScyFy'
  },
  {
    // Books
    name: 'Biographies'
  },
  {
    // Books
    name: 'Fiction'
  },
  {
    // Books
    name: 'Mystery'
  }
]


Category.create(categories, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${categories.length} categories`)

  
  for(let i = 0; i < categories.length; i++){
    let theName = categories[i].name;
    Category.find({name: theName})
      .then(response => {
        console.log('response: ', response);

        

      }) 
      .catch(err => console.log(err));
      setTimeout(() => {
      }, 100);
  }

});



















// // ORDER SEEDS
// const orders = [
//   {
//     title: "The Hunger Games",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     author: "Suzanne Collins",
//     rating: 10
//   },

// ]

// Order.create(orders, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${orders.length} orders`)
//   // mongoose.connection.close()
// });
// // END ORDER SEEDS


// // PRODUCT SEEDS
// const products = [
//   {
//     title: "The Hunger Games",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     author: "Suzanne Collins",
//     rating: 10
//   },

// ]

// Product.create(products, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${products.length} products`)
//   // mongoose.connection.close()
// });
// // END PRODUCT SEEDS


// // USER SEEDS
// const users = [
//   {
//     title: "The Hunger Games",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     author: "Suzanne Collins",
//     rating: 10
//   },

// ]

// User.create(users, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${users.length} users`)
//   mongoose.connection.close()
// });
// // END USER SEEDS

// // END OF FILE