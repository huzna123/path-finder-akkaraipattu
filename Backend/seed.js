const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || 'your_mongodb_connection_string_here')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

// Destination Schema
const destinationSchema = new mongoose.Schema({
  title: String,
  category: String,
  distanceFromLocation: String,
  description: String,
  openingHours: String,
  peakHours: String,
  bestTimeToVisit: String,
  entryFee: String,
  parking: String,
  dressCode: String
});

const Destination = mongoose.model('Destination', destinationSchema);

// Proposal 10 Official Places Data with Detailed Descriptions
const destinations = [
  {
    title: "Addalaichenai Grand Mosque",
    category: "Heritage",
    distanceFromLocation: "2.5km",
    description: "Addalaichenai Grand Mosque is a prominent and historically significant local landmark renowned for its magnificent Islamic architecture and rich spiritual heritage. It serves as a vital community and religious center for daily prayers and grand religious gatherings, drawing people with its peaceful ambiance and cultural importance. Visitors are often captivated by its striking structural design and the serene environment that surrounds the prayer halls. Throughout the holy months and festive seasons, the mosque becomes an active focal point for charity events and community bonding. Exploring this landmark offers travelers a deep appreciation of the local Islamic heritage and the traditional craftsmanship embedded in the region.",
    openingHours: "5:00 AM - 8:30 PM",
    peakHours: "12:30 PM - 1:30 PM & 6:30 PM - 8:00 PM",
    bestTimeToVisit: "Early Morning or Sunset",
    entryFee: "Free",
    parking: "Available on-site",
    dressCode: "Modest & Respectful (Cover shoulders & knees)"
  },
  {
    title: "Akkaraipattu Municipal Council",
    category: "Heritage",
    distanceFromLocation: "1km",
    description: "Akkaraipattu Municipal Council functions as the key administrative heart of the town, managing civic services, local urban development, and public welfare initiatives. The premises stand as an important institutional hub reflecting the governance and organized administration of the region. It coordinates various public projects aimed at improving local infrastructure, sanitation, and recreational zones for residents. The surrounding office complex oversees essential documentation and municipal permissions required for civic functioning. For anyone studying urban planning or local governance, this site represents the core framework of community management.",
    openingHours: "8:00 AM - 4:30 PM (Mon - Fri)",
    peakHours: "10:00 AM - 2:00 PM",
    bestTimeToVisit: "Morning",
    entryFee: "Free",
    parking: "Available",
    dressCode: "Smart Casual"
  },
  {
    title: "Food Champ Restaurant",
    category: "Dining",
    distanceFromLocation: "1.2km",
    description: "Food Champ Restaurant is a popular regional eatery widely recognized for serving a diverse menu of delicious fast food, traditional local meals, and refreshing beverages. It is a favorite hangout spot for families and friends looking to enjoy a satisfying culinary experience in a comfortable setting. The restaurant boasts a vibrant ambiance with quick service and an array of customer-favorite specialties that cater to diverse tastes. Patrons frequently gather here during evenings to relax after a long day of work or exploration. Its strategic location makes it easily accessible for travelers seeking a hearty meal right within the town.",
    openingHours: "11:00 AM - 11:00 PM",
    peakHours: "7:30 PM - 9:30 PM",
    bestTimeToVisit: "Dinner Time",
    entryFee: "Not Applicable",
    parking: "Available on-site",
    dressCode: "Smart Casual"
  },
  {
    title: "Akkaraipattu Beach and Park",
    category: "Beach",
    distanceFromLocation: "2.2km",
    description: "Akkaraipattu Beach and Park offers a scenic coastal recreation area where visitors can enjoy soothing sea breezes, wide sandy shores, and vibrant evening sunsets. Laced with nearby food stalls and open green spaces, it serves as the ultimate leisure destination for families and nature lovers. Children can often be seen playing across the landscaped park areas while adults stroll along the coastline to unwind. The location also hosts various casual social gatherings and weekend outings for local residents. Capturing the breathtaking horizon during twilight makes it a favorite spot for photography enthusiasts.",
    openingHours: "Open 24 Hours (Recommended: 6:00 AM - 6:30 PM)",
    peakHours: "4:30 PM - 6:30 PM",
    bestTimeToVisit: "Late Afternoon / Sunset",
    entryFee: "Free",
    parking: "Available",
    dressCode: "Casual & Beachwear"
  },
  {
    title: "Akkaraipattu Town",
    category: "Nature",
    distanceFromLocation: "2.4km",
    description: "Akkaraipattu Town is a massive and lively commercial bazaar that acts as the bustling economic epicenter of the region. Here, locals and travelers actively trade and shop for fresh coastal seafood, farm-fresh regional produce, aromatic spices, and a wide variety of textiles. The bustling streets echo with the vibrant sounds of daily commerce and friendly interactions among community members. Numerous small shops and traditional vendors line the pathways, offering an authentic glimpse into local trade practices. Visiting the town provides an immersive experience into the daily lifestyle and economic pulse of the region.",
    openingHours: "6:00 AM - 8:00 PM",
    peakHours: "4:00 PM - 6:30 PM",
    bestTimeToVisit: "Morning or Late Afternoon",
    entryFee: "Free",
    parking: "Street Parking",
    dressCode: "Casual"
  },
  {
    title: "Kings Asia Chef",
    category: "Dining",
    distanceFromLocation: "3.2km",
    description: "Kings Asia Chef is a well-established dining venue celebrated for its specialized Asian culinary creations and appetizing local dishes. With an inviting ambiance and flavorful preparations, it attracts food enthusiasts seeking an exceptional dining experience within the town. The chefs use carefully selected ingredients to craft signature dishes that leave a lasting impression on guests. Its cozy seating arrangements and polite hospitality ensure a pleasant time for groups and couples alike. It stands out as a prime destination for anyone looking to explore rich Asian flavors fused with local culinary touches.",
    openingHours: "11:00 AM - 11:00 PM",
    peakHours: "7:30 PM - 9:30 PM",
    bestTimeToVisit: "Dinner Time",
    entryFee: "Not Applicable",
    parking: "Available on-site",
    dressCode: "Smart Casual"
  },
  {
    title: "Sinna Muhathuvaram bridge lookout",
    category: "Sightseeing",
    distanceFromLocation: "1.4km",
    description: "Sinna Muhathuvaram bridge lookout provides breathtaking panoramic views of the surrounding dynamic waterways and meeting points of land and river. It is an ideal spot for photography enthusiasts and sightseers who want to soak in the tranquil beauty of the local landscape. The gentle winds flowing across the bridge create a refreshing atmosphere for evening visitors. People frequently stop by to watch the stunning reflections of the sky on the water surface during dawn and dusk. It offers a peaceful retreat away from the noisy urban areas, encouraging quiet contemplation and scenic enjoyment.",
    openingHours: "Open 24 Hours (Recommended: 6:00 AM - 6:30 PM)",
    peakHours: "4:30 PM - 6:30 PM",
    bestTimeToVisit: "Late Afternoon / Sunset",
    entryFee: "Free",
    parking: "Roadside Parking",
    dressCode: "Casual"
  },
  {
    title: "Oluvil Lighthouse and Port",
    category: "Sightseeing",
    distanceFromLocation: "7.2km",
    description: "Oluvil Lighthouse and Port features a striking historic lighthouse overlooking a bustling fisheries harbour and expansive coastal waters. It stands as a remarkable maritime landmark where visitors can watch local fishing boats and experience refreshing sea views. The architectural elegance of the lighthouse against the backdrop of the ocean creates a majestic sight. Visitors can observe the daily maritime activities of fishermen bringing in their fresh catches from the deep sea. It remains a historically and economically significant coastal landmark for travelers touring the eastern coastline.",
    openingHours: "6:00 AM - 6:30 PM",
    peakHours: "4:30 PM - 6:30 PM",
    bestTimeToVisit: "Late Afternoon / Sunset",
    entryFee: "Free",
    parking: "Available on-site",
    dressCode: "Casual"
  },
  {
    title: "Sammanthurai Central Market",
    category: "Shopping",
    distanceFromLocation: "15km",
    description: "Sammanthurai Central Market is a vibrant and major trading hub heavily frequented for purchasing farm-fresh agricultural produce, daily essentials, and traditional local spices. It gives visitors an authentic taste of the region's everyday commerce and vibrant trade culture. The market stalls overflow with colorful vegetables, fruits, and indigenous ingredients sourced directly from nearby farms. Vendors and buyers engage in lively negotiations, adding to the energetic atmosphere of the marketplace. Exploring this hub provides deep insight into the agrarian economy and community lifestyle of the surrounding areas.",
    openingHours: "7:00 AM - 7:00 PM",
    peakHours: "9:00 AM - 11:00 AM",
    bestTimeToVisit: "Morning",
    entryFee: "Free",
    parking: "Available",
    dressCode: "Casual"
  },
  {
    title: "Deegawapi Stupa and Monastery",
    category: "Heritage",
    distanceFromLocation: "8.6km",
    description: "Deegawapi Stupa and Monastery is an ancient and deeply revered Buddhist historical complex steeped in centuries of archaeological and religious significance. The sacred site draws pilgrims and history lovers alike to explore its monumental ruins and serene spiritual atmosphere. Archaeological remnants scattered across the grounds tell tales of an advanced ancient civilization and royal patronage. Visitors walk through the quiet premises wrapped in deep historical reverence and architectural wonder. It serves as a monumental treasure that preserves the ancient heritage and spiritual legacy of the island.",
    openingHours: "6:00 AM - 7:00 PM",
    peakHours: "4:00 PM - 6:00 PM",
    bestTimeToVisit: "Morning or Evening",
    entryFee: "Free",
    parking: "Available on-site",
    dressCode: "Modest & Respectful (Cover shoulders & knees)"
  }
];

const seedDB = async () => {
  try {
    await Destination.deleteMany({}); // Delete old duplicate data
    await Destination.insertMany(destinations);
    console.log("Database Seeded with 10 Official Proposal Destinations!");
  } catch (err) {
    console.log("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();