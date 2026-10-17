import chickenPickleImage from "../assets/products/chicken-pickle.jpeg.jpeg";
import prawnPickleImage from "../assets/products/prawn-pickle.jpeg.jpeg";
import keemaPickleImage from "../assets/products/keema-pickle.jpeg.jpeg";
import cashewPickleImage from "../assets/products/cashew-pickle.jpeg.jpeg";
import gonguraChickenPickleImage from "../assets/products/gongura-chicken-pickle.jpeg";
import gonguraChickenBonelessPickleImage from "../assets/products/gongura-chicken-boneless-pickle.jpeg";
import muttonPickleImage from "../assets/products/mutton-pickle.jpeg";
import gonguraMuttonPickleImage from "../assets/products/gongura-mutton-pickle.jpeg";
import gonguraMuttonKheemaPickleImage from "../assets/products/gongura-mutton-kheema-pickle.jpeg";
import gonguraPrawnPickleImage from "../assets/products/gongura-prawn-pickle.jpeg";

export const SIZE_OPTIONS = ["250gm", "500gm", "1kg"];

export const products = [
  {
    name: "Chicken Pickle",
    description: "Bold. Spicy. Irresistible.",
    price: 349,
    image: chickenPickleImage,
  },
  {
    name: "Prawn Pickle",
    description: "Coastal flavours in a jar.",
    price: 525,
    image: prawnPickleImage,
  },
  {
    name: "Mutton Keema Pickle",
    description: "Rich. Spicy. Traditional.",
    price: 650,
    image: keemaPickleImage,
  },
  {
    name: "Cashew Pickle",
    description: "A crunchy twist.",
    price: 400,
    image: cashewPickleImage,
  },
];

export const fullMenu = [
  {
    category: "Chicken Pickles",
    name: "Chicken Bone",
    description: "Bold. Spicy. Irresistible.",
    image: chickenPickleImage,
    prices: { "250gm": 349, "500gm": 699, "1kg": 1399 },
  },
  {
    category: "Chicken Pickles",
    name: "Chicken Boneless",
    description: "Tender chicken, bold spice.",
    image: chickenPickleImage,
    prices: { "250gm": 449, "500gm": 899, "1kg": 1799 },
  },
  {
    category: "Chicken Pickles",
    name: "Gongura Chicken Bone",
    description: "Tangy gongura meets chicken.",
    image: gonguraChickenPickleImage,
    prices: { "250gm": 399, "500gm": 799, "1kg": 1599 },
  },
  {
    category: "Chicken Pickles",
    name: "Gongura Chicken Boneless",
    description: "Tangy gongura, boneless bite.",
    image: gonguraChickenBonelessPickleImage,
    prices: { "250gm": 499, "500gm": 999, "1kg": 1999 },
  },
  {
    category: "Mutton Pickles",
    name: "Mutton Bone Pickle",
    description: "Rich mutton, slow-cooked spice.",
    image: muttonPickleImage,
    prices: { "250gm": 550, "500gm": 1100, "1kg": 2200 },
  },
  {
    category: "Mutton Pickles",
    name: "Mutton Boneless Pickle",
    description: "Deep flavour, no bones.",
    image: muttonPickleImage,
    prices: { "250gm": 650, "500gm": 1300, "1kg": 2600 },
  },
  {
    category: "Mutton Pickles",
    name: "Gongura Mutton Pickle",
    description: "Tangy gongura mutton mix.",
    image: gonguraMuttonPickleImage,
    prices: { "250gm": 600, "500gm": 1200, "1kg": 2400 },
  },
  {
    category: "Mutton Pickles",
    name: "Gongura Mutton Boneless Pickle",
    description: "Tangy gongura, boneless mutton.",
    image: gonguraMuttonPickleImage,
    prices: { "250gm": 700, "500gm": 1400, "1kg": 2800 },
  },
  {
    category: "Mutton Pickles",
    name: "Mutton Kheema Pickle",
    description: "Rich. Spicy. Traditional.",
    image: keemaPickleImage,
    prices: { "250gm": 650, "500gm": 1300, "1kg": 2600 },
  },
  {
    category: "Mutton Pickles",
    name: "Gongura Mutton Kheema",
    description: "Tangy gongura kheema blend.",
    image: gonguraMuttonKheemaPickleImage,
    prices: { "250gm": 700, "500gm": 1400, "1kg": 2800 },
  },
  {
    category: "Prawns Pickles",
    name: "Prawn Pickle",
    description: "Coastal flavours in a jar.",
    image: prawnPickleImage,
    prices: { "250gm": 525, "500gm": 1050, "1kg": 2100 },
  },
  {
    category: "Prawns Pickles",
    name: "Gongura Prawn Pickle",
    description: "Tangy gongura, coastal catch.",
    image: gonguraPrawnPickleImage,
    prices: { "250gm": 550, "500gm": 1100, "1kg": 2200 },
  },
  {
    category: "Veg Pickles",
    name: "Kaju (Cashew) Pickle",
    description: "A crunchy twist.",
    image: cashewPickleImage,
    prices: { "250gm": 400, "500gm": 800, "1kg": 1600 },
  },
];

export const reviews = [
  {
    quote:
      "“The chicken pickle tastes just like home. Perfect spice level and amazing quality!”",
    author: "Sneha R.",
  },
  {
    quote:
      "“Absolutely loved the prawn pickle! You can feel the authenticity in every bite.”",
    author: "Rahul K.",
  },
  {
    quote:
      "“Mom’s Nest pickles are a must try for anyone who loves traditional Andhra flavours.”",
    author: "Priya M.",
  },
];

export { chickenPickleImage };
