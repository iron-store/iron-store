const mongoose = require('mongoose');

const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');

const dbName = 'iron-store';
mongoose.connect(`mongodb://localhost/${dbName}`);

Category.collection.drop();
User.collection.drop();
Product.collection.drop();


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
]// END OF CHILD CATEGORIES

/*
// This populates the catgories collection
// all the logic is necessary because child categories depend 
// on the IDs of their parent categories.
*/
Category.create(categories, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${categories.length} categories`)

  for(let i = 0; i < categories.length; i++){
    let theName = categories[i].name;
    Category.find({name: theName})
      .then(response => {
        // console.log('response: ', response);

        let theId = response[0]._id;
        // console.log('theId: ', theId);

        for (let j = 0; j < 3; j++){
          childCategories[(i*3) + j].parent = theId;
          // console.log('(i*3) + j: ', (i*3) + j);
          // console.log('childCategories[i + j]: ', childCategories[i + j]);
        }

      }) 
      .catch(err => console.log(err));
      setTimeout(() => {
      }, 300);
    }
    
    setTimeout(() => {
      // console.log(childCategories);
      Category.create(childCategories, (err) => {
        if (err) { throw(err) }
        console.log(`Created ${childCategories.length} child categories`)
      });
    }, 4000);
});





// PRODUCT SEEDS
const products = [
  {
    // TVs
    name: 'Sony TV',
    price: 2000,
    description: '4k 50 inches',
    category: 'TVs',
  },
  {
    // TVs
    name: 'Sanwa TV',
    price: 100,
    description: 'Used, in working condition',
    category: 'TVs',
  },
  {
    // TVs
    name: 'Panasonic',
    price: 600,
    description: '32 inches 1080p',
    category: 'TVs',
  },
  {
    // Video Game Consoles
    name: 'Nintendo Switch',
    price: 300,
    description: 'Kiddy',
    category: 'Video Game Consoles',
  },
  {
    // Video Game Consoles
    name: 'XBox One',
    price: 400,
    description: 'GrimDark',
    category: 'Video Game Consoles',
  },
  {
    // Video Game Consoles
    name: 'PS4',
    price: 600,
    description: 'Too Expensive',
    category: 'Video Game Consoles',
  },
  {
    // Cellphones
    name: 'iPhone X',
    price: 1000,
    description: 'Why is it so expensive?',
    category: 'Cellphones',
  },
  {
    // Cellphones
    name: 'Samsung Galaxy J3',
    price: 70,
    description: 'Cheap',
    category: 'Cellphones',
  },
  {
    // Cellphones
    name: 'Motorola Moto G',
    price: 120,
    description: '2nd generation unlocked',
    category: 'Cellphones',
  },
  {
    // Fruits
    name: 'Pear',
    price: 1,
    description: 'One single pear',
    category: 'Fruits',
  },
  {
    // Fruits
    name: 'Apples',
    price: 5,
    description: '1 pound of Fuji Apples',
    category: 'Fruits',
  },
  {
    // Fruits
    name: 'Bananas',
    price: .69,
    description: 'Daylight coming, me wan go home',
    category: 'Fruits',
  },
  {
    // Snacks
    name: 'Cheetoes',
    price: 1,
    description: 'The spicy kind',
    category: 'Snacks',
  },
  {
    // Snacks
    name: 'Doritos',
    price: 2,
    description: 'you better get some salsa',
    category: 'Snacks',
  },
  {
    // Snacks
    name: 'Cashews',
    price: 6,
    description: 'Whole, seasalted, fancy cashews',
    category: 'Snacks',
  },
  {
    // Meat
    name: 'Filet Mignon',
    price: 10,
    description: '5 filets',
    category: 'Meat',
  },
  {
    // Meat
    name: 't-bone',
    price: 4,
    description: 'One pound t-bone steak',
    category: 'Meat',
  },
  {
    // Meat
    name: 'top Sirloin',
    price: 3,
    description: '2 pounds of pre-sliced sirloin steaks',
    category: 'Meat',
  },
  {
    // Shirts
    name: 'White long sleeve',
    price: 12,
    description: 'No Iron',
    category: 'Shirts',
  },
  {
    // Shirts
    name: 'Silk',
    price: 60,
    description: 'Fancy. Hand-wash only',
    category: 'Shirts',
  },
  {
    // Shirts
    name: 'Captain America Shield',
    price: 25,
    description: 'Limited edition collectors item',
    category: 'Shirts',
  },
  {
    // Pants
    name: 'Black dress pants',
    price: 40,
    description: 'No iron',
    category: 'Pants',
  },
  {
    // Pants
    name: 'Shorts',
    price: 20,
    description: 'Do they really count as pants?',
    category: 'Pants',
  },
  {
    // Pants
    name: 'Jeans',
    price: 45,
    description: 'Pre-ripped through authentic wear and tear',
    category: 'Pants',
  },
  {
    // Underwear
    name: 'Boxers',
    price: 15,
    description: 'Assorted colors',
    category: 'Underwear',
  },
  {
    // Underwear
    name: 'Tighty whities',
    price: 0,
    description: 'It seems these are still a thing',
    category: 'Underwear',
  },
  {
    // Underwear
    name: 'Bra',
    price: 50,
    description: 'Lacy, confortable (not really)',
    category: 'Underwear',
  },
  {
    // Romance
    name: 'Love Story',
    price: 10,
    description: '1970s movie could not get more on the nose with the title',
    category: 'Romance',
  },
  {
    // Romance
    name: 'Gone with the Wind',
    price: 10,
    description: 'Remastered classic (?)',
    category: 'Romance',
  },
  {
    // Romance
    name: 'When Harry met Sally',
    price: 12,
    description: 'This is a romance movie? I thought it was a comedy.',
    category: 'Romance',
  },
  {
    // Horror
    name: 'It',
    price: 13,
    description: 'Remake of the classic',
    category: 'Horror',
  },
  {
    // Horror
    name: 'The Witch',
    price: 11,
    description: 'I thought that in this post Harry Potter world, you needed something besides a plain witch to be scary.',
    category: 'Horror',
  },
  {
    // Horror
    name: 'HellRaiser',
    price: 10,
    description: 'Acupuncture Gone Wrong',
    category: 'Horror',
  },
  {
    // SciFi
    name: 'Back to the Future',
    price: 11,
    description: 'Where are my flying cars?',
    category: 'SciFi',
  },
  {
    // SciFi
    name: 'Star Wars',
    price: 11,
    description: 'Don\'get exited, It\'s one of the prequels.',
    category: 'SciFi',
  },
  {
    // SciFi
    name: 'Star Trek',
    price: 11,
    description: 'The one with time travel and whales.',
    category: 'SciFi',
  },
  {
    // Biographies
    name: 'Charles Dickens',
    price: 14,
    description: 'Life of the Romantic writer. Note: not romance',
    category: 'Biographies',
  },
  {
    // Biographies
    name: 'Emilia Earnhart',
    price: 15,
    description: 'Life of the dring pilot and the mystery surrounding her death',
    category: 'Biographies',
  },
  {
    // Biographies
    name: 'Abraham Lincon',
    price: 20,
    description: 'Feeling patriotic yet?',
    category: 'Biographies',
  },
  {
    // Fiction
    name: 'A song of Ice and Fire',
    price: 20,
    description: 'First book of the acclaimed series. Even crazier than the show if you can believe that.',
    category: 'Fiction',
  },
  {
    // Fiction
    name: 'The Lord of the Rings',
    price: 22,
    description: 'Get ready for a lot of singing and poetry if you have only seen the movies.',
    category: 'Fiction',
  },
  {
    // Fiction
    name: 'Return of the King',
    price: 21,
    description: 'Last book in the Lord of the Rings trilogy.',
    category: 'Fiction',
  },
  {
    // Mystery
    name: 'And then there were None',
    price: 13,
    description: 'By Agatha Christie',
    category: 'Mystery',
  },
  {
    // Mystery
    name: 'Murder in the Orient Express',
    price: 11,
    description: 'By Agatha Christie',
    category: 'Mystery',
  },
  {
    // Mystery
    name: 'The Outsider',
    price: 14,
    description: 'By Stephen King',
    category: 'Mystery',
  },

]

setTimeout(() => {
  Product.create(products, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${products.length} products`)
    // mongoose.connection.close()
  });
}, 3000);
// END PRODUCT SEEDS






// USER SEEDS
const users = [
  {
    username: 'admin',
    // password: 123,
    password: '$2a$10$1TAgPLkU2Dv36eltB3veRuUzLo.Ln.XcGTW87S5PZYUWLMHCNj51u',
    email: 'admin@admin.com',
    // role of admin must be manualy changed in the database
    // role: 'ADMIN'
  },
  {
    username: 'user',
    // password: 123,
    password: '$2a$10$rRZi5rZN5kjEOCvpt02Ez.Cm09YVx46wNQ5Ab76PrEs4oAeAudRx6',
    email: 'user@user.com',
  },
  {
    username: '11',
    // password: 11,
    password: '$2a$10$rr4iIdIjBUYtnSQ4Tc7GL.AR8f3k9Q7BsSYXaqOH1Zjlx/kLuJZT2',
    email: '11@11.com',
  },
]

setTimeout(() => {
  User.create(users, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${users.length} users`)
  });
}, 1000);

// END USER SEEDS

// // END OF FILE