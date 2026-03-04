import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";


const getTransactions = async (userId) => {
  const data = await Transaction.find({userId, status: true}).populate("fundId");

  
  return data
}

export const getAllTransactions = async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await getTransactions(userId)
   res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export const setSubcribe = async (req, res) => {
  try {
    const { fundId, userId , status, notification, amount} = req.body;
    const {_id} = await Transaction.create({
          userId,
          fundId,
          status,
          amount,
          notification
        });
        
    const transaction = await Transaction.find({_id}).populate("fundId");
    
    let user = await User.find({_id:userId})
        user = user[0]
        if (status) {
          user.balance -= transaction[0].amount
        }else{
          user.balance += transaction[0].amount
        }
        
      await user.save();
   res.status(201).json({ message: "Transaccion creada correctamente" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};


