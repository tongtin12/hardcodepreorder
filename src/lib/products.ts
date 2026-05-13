import photobook from "@/assets/product-photobook.jpg";
import vinyl from "@/assets/product-vinyl.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import polaroid from "@/assets/product-polaroid.jpg";
import necklace from "@/assets/product-necklace.jpg";
import tote from "@/assets/product-tote.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: "Photobook" | "Vinyl" | "Apparel" | "Collectible" | "Accessory";
  price: number;
  image: string;
  stockLeft: number;
  totalStock: number;
  description: string;
  variants?: string[];
  bonus?: string;
};

export const products: Product[] = [
  {
    id: "heartcode-photobook",
    name: "Heartcode Photobook",
    tagline: "180-page cinematic edition",
    category: "Photobook",
    price: 89,
    image: photobook,
    stockLeft: 42,
    totalStock: 500,
    description:
      "A 180-page hardcover archive of unreleased portraits, behind-the-scenes frames and intimate handwritten letters. Foil-stamped cover, ribbon bookmark, numbered.",
    bonus: "Includes signed polaroid and exclusive QR film",
  },
  {
    id: "crimson-vinyl",
    name: "Crimson Edition Vinyl",
    tagline: "Translucent red 12\" LP",
    category: "Vinyl",
    price: 64,
    image: vinyl,
    stockLeft: 18,
    totalStock: 300,
    description:
      "Limited 180g translucent crimson vinyl pressing of the Heartcode soundtrack. Etched B-side, gatefold sleeve with fold-out poster.",
    bonus: "Hand-numbered insert card",
  },
  {
    id: "embroidered-hoodie",
    name: "Embroidered Heart Hoodie",
    tagline: "Heavyweight 480gsm",
    category: "Apparel",
    price: 128,
    image: hoodie,
    stockLeft: 76,
    totalStock: 600,
    description:
      "Boxy fit heavyweight hoodie in deep obsidian. Embroidered heart insignia at chest, signature on inner cuff. Garment-dyed for a worn-in hand.",
    variants: ["S", "M", "L", "XL"],
    bonus: "Free Heartcode lookbook with apparel",
  },
  {
    id: "polaroid-set",
    name: "Limited Polaroid Set",
    tagline: "Set of 12 ribboned",
    category: "Collectible",
    price: 38,
    image: polaroid,
    stockLeft: 9,
    totalStock: 250,
    description:
      "Twelve archival polaroids tied with hand-cut satin ribbon. Each set is hand-numbered with two lenticular surprise prints.",
    bonus: "Random chance of signed print",
  },
  {
    id: "heart-necklace",
    name: "Silver Heart Pendant",
    tagline: "925 sterling silver",
    category: "Accessory",
    price: 95,
    image: necklace,
    stockLeft: 31,
    totalStock: 200,
    description:
      "Solid 925 sterling silver heart on a 50cm cable chain. Engraved with the Heartcode glyph on the reverse. Comes in a velvet jewellery box.",
    variants: ["45cm", "50cm", "55cm"],
  },
  {
    id: "heart-tote",
    name: "Heart Insignia Tote",
    tagline: "Heavy canvas, pink heart",
    category: "Apparel",
    price: 42,
    image: tote,
    stockLeft: 120,
    totalStock: 800,
    description:
      "Oversized 16oz canvas tote with the iconic pink Heartcode insignia. Reinforced leather-look straps, interior pocket.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = ["All", "Photobook", "Vinyl", "Apparel", "Collectible", "Accessory"] as const;