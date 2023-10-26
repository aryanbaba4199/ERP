// pages/api/ledger.js
import connectDB from "../../../lib/mongodb";
import Sales from "../../../lib/schema/crdeitSchema";


connectDB();

export default async function POST(req, res) {
  if(req.method === "POST"){
  try {
    const { date, memo, partyName, description, vehNumber, product, qty, rate, amount } = req.body;
    console.log(date,memo,partyName,description);

    // Extract the date in the format "dd-mm-yyyy" from the provided date
    const dateArray = date.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const modifiedDate = new Date(date).toISOString().split('T')[0];

    const salesData = new Sales({
      date : modifiedDate,
      memo : memo,
      partyName : partyName,
      description : description,
      vehNumber : vehNumber,
      product : product,
      qty:qty,
      rate : rate,
      amount : amount,
      
    });
    
    

    
    await salesData.save();
    res.status(201).json({message : 'Success'});
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: "Error saving data" });
  }}
  if(req.method === 'GET'){
    const date = req.query.date;
    
    try{
        const salesData = await Sales.find({date});
        res.status(200).json(salesData);
    }catch (error) {
        res.status(500).json({message : 'Error'});
    }

  }
  if(req.method === 'DELETE'){
    try {
        const saleId = req.query.id;
        console.log(saleId);
        const sale = await Sales.findById(saleId);
        if (!sale) {
            return res.status(404).json({ message: 'data not found' });
        }
        await Sales.findByIdAndDelete(saleId);
        return res.status(200).json({ message: 'delete = success' });
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ message: 'Error' });
    }
}

}





