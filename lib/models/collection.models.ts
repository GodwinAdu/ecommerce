import mongoose, { Document, Schema } from "mongoose";
const collectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  imageUrl: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
})

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
