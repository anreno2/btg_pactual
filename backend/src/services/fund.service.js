import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model.js";
import Fund from "../models/fund.model.js";
import Transaction from "../models/transaction.model.js";

export const subscribeFund = async (userId, fundId) => {
  const user = await User.findById(userId);
  const fund = await Fund.findById(fundId);

  if (!fund) throw new Error("Fondo no existe");

  if (user.balance < fund.minimumAmount) {
    throw new Error(
      `No tiene saldo disponible para vincularse al fondo ${fund.name}`
    );
  }

  user.balance -= fund.minimumAmount;
  await user.save();

  return await Transaction.create({
    _id: uuidv4(),
    userId,
    fundId,
    type: "OPEN",
    amount: fund.minimumAmount,
    status: "SUCCESS"
  });
};