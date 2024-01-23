const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    Products: [
      {
        Product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        Quantity: Number,
        Color: String,
      },
    ],
    PaymentIntent: {},
    OrderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Cancelled",
        "Delivered",
      ],
    },
    OrderBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ShippingInfo: {
      FirstName: {
        type: String,
        required: true
      },
      LastName: {
        type: String,
        required: true
      },
      Address: {
        type: String,
        required: true
      },
      City: {
        type: String,
        required: true
      },
      ZipCode: {
        type: String,
        required: true
      },
      Other: {
        type: String,
      },
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
//Export the model
module.exports = Order;
