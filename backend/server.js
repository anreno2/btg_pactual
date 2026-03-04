import app from "./src/app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://anreno_db_user:c8vzo1FjScOKyPaF@cluster0.zuu6gqv.mongodb.net/?appName=Cluster0")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(console.error);