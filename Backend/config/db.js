import mongoose from "mongoose";

export const db = async()=>{
    await mongoose.connect("mongodb+srv://veerasubandh:Veera123@cluster0.om4fa.mongodb.net/Food-Delivery-App").then(()=>console.log("DB Connected"))
}