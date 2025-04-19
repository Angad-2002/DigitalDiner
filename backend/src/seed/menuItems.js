import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const menuItems = [
  {
    name: "Garlic Bread",
    description: "Freshly baked bread with garlic butter and herbs",
    price: 5.99,
    category: "Appetizers",
    ingredients: ["Bread", "Garlic", "Butter", "Parsley"],
    allergens: ["Wheat", "Dairy"],
    isAvailable: true
  },
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 8.99,
    category: "Appetizers",
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Croutons", "Parmesan Cheese"],
    allergens: ["Wheat", "Dairy", "Eggs"],
    isAvailable: true
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    category: "Main Courses",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Basil"],
    allergens: ["Wheat", "Dairy"],
    isAvailable: true
  },
  {
    name: "Spaghetti Bolognese",
    description: "Pasta with rich meat sauce",
    price: 14.99,
    category: "Main Courses",
    ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onions", "Garlic"],
    allergens: ["Wheat", "Eggs"],
    isAvailable: true
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 7.99,
    category: "Desserts",
    ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Sugar", "Vanilla Ice Cream"],
    allergens: ["Wheat", "Dairy", "Eggs"],
    isAvailable: true
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
    price: 8.99,
    category: "Desserts",
    ingredients: ["Ladyfingers", "Coffee", "Mascarpone Cheese", "Eggs", "Cocoa Powder"],
    allergens: ["Wheat", "Dairy", "Eggs"],
    isAvailable: true
  },
  {
    name: "Iced Tea",
    description: "Refreshing iced tea with lemon",
    price: 3.99,
    category: "Drinks",
    ingredients: ["Black Tea", "Lemon", "Sugar"],
    allergens: [],
    isAvailable: true
  },
  {
    name: "Craft Beer",
    description: "Local craft beer selection",
    price: 6.99,
    category: "Drinks",
    ingredients: ["Barley", "Hops", "Yeast", "Water"],
    allergens: ["Gluten"],
    isAvailable: true
  }
];

const seedMenuItems = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully');

    // Clear existing menu items
    console.log('Clearing existing menu items...');
    await MenuItem.deleteMany({});
    
    // Insert new menu items
    console.log('Inserting new menu items...');
    await MenuItem.insertMany(menuItems);
    
    console.log('Menu items seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu items:', error);
    process.exit(1);
  }
};

seedMenuItems(); 