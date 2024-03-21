import mongoose, { Document, Schema } from "mongoose";

const customerSchema = new Schema({
  clerkId: String,
  name: String,
  email: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
