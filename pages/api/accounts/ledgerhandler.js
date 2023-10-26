// pages/api/ledger.js
import connectDB from "../../../lib/mongodb";
import PartyLedger from "../../../lib/schema/ledgerSchema";

connectDB();

export default async function POST(req, res) {

  if (req.method === "POST") {
    let date = new Date().toISOString().split("T")[0];
    let memo = "";
    let desc = "";
    let vehNumber = "";
    let product = "";
    let qty = "";
    let rate = "";
    let amount = "";
    try {
      const { name, mobile, balance } = req.body;

      if (!name || !mobile || !balance) {
        res.status(400).json({ message: "Incomplete data. Please provide all required fields." });
        return;
      }
      
      

      const ledger = new PartyLedger({
        date,
        mobile,
        name,
        memo,
        desc,
        vehNumber,
        product,
        qty,
        rate,
        amount,
        balance,
      });

      await ledger.save();
      console.log("Success");

      res.status(201).json({ message: "Party ledger created successfully" });
    } catch (error) {
      console.log("Error in creation");
      console.error("Error creating", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  
  

  //___________Getting Ledger Information___________
  if (req.method === "GET") {
    try {
      const ledgers = await PartyLedger.find();
      res.status(200).json(ledgers);
    } catch (error) {
      console.error("Error fetching ledgers", error);
      res.status(500).json({ message: "Server error" });
    }
  }
  
}