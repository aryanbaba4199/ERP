import connectDB from "../../../lib/mongodb";
import Productformat from "../../../lib/schema/productSchema";

connectDB();

export default async function POST(req, res) {
  if (req.method === "POST") {
    try {
      const { Product, Des, stock, Rate } = req.body;
      if (!Product || !Des || !stock || !Rate) {
        res.status(400).json({ message: "Invalid data" });
        return;
      }
      const productpack = new Productformat({
        Product: Product, // Map prname to Product
        Des: Des, // Map des to Des
        stock: stock,
        Rate: Rate,
      });
      await productpack.save();
      console.log("Product Created");
      res.status(201).json({ message: "Product Created" });
    } catch (err) {
      console.log("Something went wrong:", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Get Products
  if (req.method === "GET") {
    try {
      const products = await Productformat.find();
      res.status(200).json(products);
    } catch (err) {
      console.log("Something went wrong:", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
