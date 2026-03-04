import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password , cel} = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      cel,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error en registro" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas ó usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas ó usuario no encontrado" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || 'NalCampeon',
      { expiresIn: "1h" }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.balance
      }
    });

  } catch (error) {    
    res.status(500).json({ message: "Error en login" , error});
  }
};