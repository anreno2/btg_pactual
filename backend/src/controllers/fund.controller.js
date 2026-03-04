import Fund from "../models/fund.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

export const getFunds = async (req, res) => {
  try {
   let funds = await Fund.find();
   
    
    const user = await User.find({_id:req.user.id}) 
    
    
   const transactions = await Transaction.find({ userId: req.user.id } ).populate("fundId").sort({createdAt: -1})
  
    funds = funds.map(x=>({
      ...x._doc,
      last : transactions.find(r=>x._id.toString()==r.fundId._id.toString())
    })
  )
   
    res.json({funds,transactions, user});
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};
