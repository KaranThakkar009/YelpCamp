const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "618392145037a53afa71f266",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)} `,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/karan-yelpcamp/image/upload/v1636190735/YelpCamp/gtzomu5dgrh1x1muvunu.jpg",
          filename: "YelpCamp/gtzomu5dgrh1x1muvunu",
        },
        {
          url: "https://res.cloudinary.com/karan-yelpcamp/image/upload/v1636190735/YelpCamp/kbdqzwvwix6usbdcrkm.jpg",
          filename: "YelpCamp/kbdqzwvwix6usbdcrkm",
        },
        {
          url: "https://res.cloudinary.com/karan-yelpcamp/image/upload/v1636190735/YelpCamp/tn2rh1uqhtdwjblmba6l.jpg",
          filename: "YelpCamp/tn2rh1uqhtdwjblmba6l",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
