import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID || 'ACdeb43810de2ebda6429aa11c62cbfaba', process.env.TWILIO_AUTH_TOKEN || '1bca3d4d44d805aff4616af65f45c2cd');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',          // o smtp.zoho.com, smtp-mail.outlook.com, etc.
  port: 587,
  secure: false,                    // true para puerto 465
  auth: {
    user: 'btgpactual95@gmail.com' ,   // tuemail@gmail.com
    pass: 'iggp pkat tfhp tsuz'    // App Password si usas Gmail
  }
});

const getTransactions = async (userId) => {
  const data = await Transaction.find({userId, status: true}).populate("fundId");
  return data
}

const sendNotificationEmailSms = async (notification, user, fundName, amount) => {
  if (notification == 'EMAIL') {
      try {
            transporter.sendMail({
            from: `"BTG Pactual" btgpactual95@gmail.com`,
            to: user.email,
            subject: '¡Apertura de Fondo! ✔',
            text: 'Este es un email de prueba enviado con Nodemailer.',
            html: `
              <h2>¡Hola!</h2>
              <p>Su Fondo de inversión <strong>${fundName}</strong> fue abierto con éxito.</p>
              <p>Valor: $${amount.toLocaleString()}</p>
              <p>Fecha: ${new Date().toLocaleString()}</p>
            `
          });
          console.log('Email enviado correctamente');
        } catch (error) {
          console.error('Error al enviar email:', error);
        }
  }else{
    try {
      client.messages.create({
        body: `Hola, Su Fondo de inversión ${fundName} fue abierto con éxito. Valor: $${amount.toLocaleString()}`,
        from: "+15705769092",
        to: `+57${user.cel}`,
      });

      console.log("SMS sent:", `+57${user.cel}`);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  }

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
      
      if (status ) {
        sendNotificationEmailSms(notification, user, transaction[0].fundId.name, transaction[0].amount)
      }
      
   res.status(201).json({ message: "Transaccion creada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};


