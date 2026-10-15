import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const demoProducts = [
  // 🥛 Dairy & Breakfast
  {
    name: "Amul Taaza Toned Milk",
    category: "🥛 Dairy & Breakfast",
    price: 27,
    mrp: 30,
    stock: 50,
    unit: "500ml",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    description: "Fresh toned milk from Amul",
  },
  {
    name: "Amul Butter",
    category: "🥛 Dairy & Breakfast",
    price: 56,
    mrp: 60,
    stock: 30,
    unit: "100g",
    image:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
    description: "Creamy Amul butter",
  },
  {
    name: "Britannia Brown Bread",
    category: "🥛 Dairy & Breakfast",
    price: 45,
    mrp: 50,
    stock: 25,
    unit: "400g",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    description: "Fresh brown bread",
  },

  // 🍎 Fruits & Vegetables
  {
    name: "Fresh Bananas",
    category: "🍎 Fruits & Vegetables",
    price: 40,
    mrp: 50,
    stock: 40,
    unit: "1 dozen",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400",
    description: "Ripe yellow bananas",
  },
  {
    name: "Red Apples",
    category: "🍎 Fruits & Vegetables",
    price: 120,
    mrp: 150,
    stock: 30,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
    description: "Fresh Kashmiri apples",
  },
  {
    name: "Fresh Tomatoes",
    category: "🍎 Fruits & Vegetables",
    price: 30,
    mrp: 40,
    stock: 45,
    unit: "500g",
    image:
      "https://images.unsplash.com/photo-1546470427-e5ac89cd0b46?w=400",
    description: "Farm fresh tomatoes",
  },
  {
    name: "Green Capsicum",
    category: "🍎 Fruits & Vegetables",
    price: 25,
    mrp: 35,
    stock: 35,
    unit: "250g",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
    description: "Crisp green capsicum",
  },

  // 🍿 Snacks & Munchies
  {
    name: "Lays Classic Salted",
    category: "🍿 Snacks & Munchies",
    price: 20,
    mrp: 20,
    stock: 100,
    unit: "52g",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    description: "Crispy potato chips",
  },
  {
    name: "Kurkure Masala Munch",
    category: "🍿 Snacks & Munchies",
    price: 20,
    mrp: 20,
    stock: 80,
    unit: "90g",
    image:
      "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400",
    description: "Spicy kurkure",
  },
  {
    name: "Oreo Biscuits",
    category: "🍿 Snacks & Munchies",
    price: 30,
    mrp: 35,
    stock: 60,
    unit: "120g",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    description: "Chocolate cream biscuits",
  },

  // 🥤 Cold Drinks & Juices
  {
    name: "Coca Cola",
    category: "🥤 Cold Drinks & Juices",
    price: 40,
    mrp: 45,
    stock: 70,
    unit: "750ml",
    image:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
    description: "Chilled Coca Cola",
  },
  {
    name: "Real Orange Juice",
    category: "🥤 Cold Drinks & Juices",
    price: 110,
    mrp: 125,
    stock: 40,
    unit: "1L",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    description: "100% orange juice",
  },

  // 🍞 Bakery & Biscuits
  {
    name: "Good Day Cashew",
    category: "🍞 Bakery & Biscuits",
    price: 30,
    mrp: 35,
    stock: 55,
    unit: "100g",
    image:
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400",
    description: "Cashew cookies",
  },
  {
    name: "Chocolate Cake",
    category: "🍞 Bakery & Biscuits",
    price: 350,
    mrp: 400,
    stock: 15,
    unit: "500g",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    description: "Fresh chocolate cake",
  },

  // 🧴 Soap & Body Care
  {
    name: "Dove Beauty Bar",
    category: "🧴 Soap & Body Care",
    price: 55,
    mrp: 65,
    stock: 45,
    unit: "100g",
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400",
    description: "Moisturizing beauty bar",
  },
  {
    name: "Dettol Original Soap",
    category: "🧴 Soap & Body Care",
    price: 40,
    mrp: 45,
    stock: 60,
    unit: "125g",
    image:
      "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400",
    description: "Antibacterial soap",
  },
  {
    name: "Colgate Strong Teeth",
    category: "🧴 Personal Care",
    price: 95,
    mrp: 110,
    stock: 50,
    unit: "200g",
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
    description: "Toothpaste with calcium",
  },

  // 👕 Fashion & Clothing
  {
    name: "Cotton T-Shirt",
    category: "👕 Fashion & Clothing",
    price: 499,
    mrp: 799,
    stock: 25,
    unit: "1 pc",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    description: "Comfortable cotton t-shirt",
  },
  {
    name: "Denim Jeans",
    category: "👕 Fashion & Clothing",
    price: 1299,
    mrp: 1999,
    stock: 15,
    unit: "1 pc",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    description: "Slim fit denim jeans",
  },

  // 🧹 Home & Cleaning
  {
    name: "Surf Excel Easy Wash",
    category: "🧹 Home & Cleaning",
    price: 180,
    mrp: 210,
    stock: 40,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    description: "Detergent powder",
  },
  {
    name: "Harpic Toilet Cleaner",
    category: "🧹 Home & Cleaning",
    price: 95,
    mrp: 110,
    stock: 35,
    unit: "500ml",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
    description: "Toilet cleaning liquid",
  },

  // 🧂 Masala & Oil
  {
    name: "Fortune Sunflower Oil",
    category: "🧂 Masala & Oil",
    price: 145,
    mrp: 160,
    stock: 50,
    unit: "1L",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    description: "Refined sunflower oil",
  },
  {
    name: "MDH Garam Masala",
    category: "🧂 Masala & Oil",
    price: 80,
    mrp: 90,
    stock: 60,
    unit: "100g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
    description: "Authentic Indian masala",
  },

  // 🍚 Atta, Rice & Dal
  {
    name: "Aashirvaad Atta",
    category: "🍚 Atta, Rice & Dal",
    price: 280,
    mrp: 320,
    stock: 40,
    unit: "5 kg",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    description: "Whole wheat flour",
  },
  {
    name: "India Gate Basmati Rice",
    category: "🍚 Atta, Rice & Dal",
    price: 350,
    mrp: 400,
    stock: 30,
    unit: "2 kg",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    description: "Premium basmati rice",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Delete existing products (optional)
    // await Product.deleteMany({});
    // console.log("🗑️ Cleared existing products");

    // Insert demo products
    const inserted = await Product.insertMany(demoProducts);
    console.log(`🎉 Added ${inserted.length} demo products!`);

    await mongoose.connection.close();
    console.log("✅ Done. Connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedDB();