import Address from "../models/Address.js";

export const addAddress = async(req,res)=> {
      try {
          console.log("Received data:", req.body);
         const {address,userId} = req.body;
         await Address.create({...address , userId})
         res.json({success : true , message:"Address added successfully"})
      } catch (error) {
           console.log(error.message);
           res.json({success:false , message:error.message});
      }
}

export const getAddress = async (req, res) => {
  try {
    console.log("Query received:", req.query); // 🐛 Add this line

    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.error("Error in getAddress:", error.message); // 🐛 Add this line
    res.status(500).json({ success: false, message: error.message });
  }
};
