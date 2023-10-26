import database from "../../../lib/mongodb";
import Totalizer from "../../../lib/schema/totalizerSchema";
import { toast } from 'react-toastify'; // Import the toast module

database();

export default async function POST(req, res) {
  if (req.method === "POST") {
    try {
      const { Meter_Name, Reading } = req.body;
      const Totalizerdata = new Totalizer({
        Meter_Name: Meter_Name,
        Reading: Reading,
      });
      await Totalizerdata.save();
      console.log("Totalizer saved successfully");
      toast("Totalizer saved successfully"); // Call toast function to show a success message
      res.status(201).json({
        message: "Totalizer saved successfully",
      });
    } catch (error) {
      console.log("Error saving:", error);
      toast.error("Error saving"); // Call toast function to show an error message
      res.status(500).json({
        message: "Error saving",
      });
    }
  }
  if (req.method === "GET") {
    try {
      const totalizer = await Totalizer.find();
      res.status(200).json(totalizer);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error"); // Call toast function to show an error message
      res.status(500).json({
        message: "Error",
      });
    }
  }
}
