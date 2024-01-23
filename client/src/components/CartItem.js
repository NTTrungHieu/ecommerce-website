import React, { useEffect, useState } from "react";
import Color from "../components/Color";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateCart } from "../features/cart/cartSlice";

const CartItem = ({ product, color, quant, isOrder = false }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(quant);

  useEffect(() => {
    setQuantity(quant);
  }, [product]);

  const handleUpdate = (value) => {
    setQuantity(value);
    dispatch(
      updateCart({
        _id: product._id,
        Color: color,
        Quantity: value,
        type: "update",
      })
    );
  };

  const handleDelete = (value) => {
    dispatch(
      updateCart({
        _id: product._id,
        Color: color,
        type: "delete",
      })
    );
  };

  return (
    <>
      <tr className="cart-item">
        <td colSpan={1} className="cart-item-image pe-0 py-md-4">
          <img src={product.Images[0]} className="border" alt={product.Title} />
        </td>
        <td colSpan={1} className="cart-item-details ps-md-4 py-md-4">
          <Link className="title">{product.Title}</Link>
          <div className="product-options mt-2 d-flex flex-column gap-1">
            <div className="d-flex gap-10 align-items-center">
              <span>Color:</span>
              <span>
                <Color className="m-0" colors={[color]} clickable={false} />
              </span>
            </div>
          </div>
        </td>
        <td
          colSpan={1}
          className="cart-item-price text-primary text-end px-md-4 py-md-4 align-middle"
        >
          ${product.Price}
        </td>
        <td colSpan={1} className="cart-item-quantity ps-md-5 py-md-4">
          <div className="d-flex align-items-center gap-20">
            <div className="d-flex w-50">
              <input
                type="number"
                className="form-control border-hover"
                value={quantity}
                readOnly
              />
              {!isOrder && (
                <div className="quantity-action">
                  <div
                    className="border-hover cursor-pointer px-2"
                    onClick={(e) => handleUpdate(quantity + 1)}
                  >
                    <FaPlus />
                  </div>
                  <div
                    className="border-hover cursor-pointer px-2"
                    onClick={(e) => quantity > 1 && handleUpdate(quantity - 1)}
                  >
                    <FaMinus />
                  </div>
                </div>
              )}
            </div>
            {!isOrder && (
              <div
                className="cart-item-remove button w-fc"
                onClick={() => handleDelete()}
              >
                <FaRegTrashAlt />
              </div>
            )}
          </div>
        </td>
        <td
          colSpan={1}
          className="cart-item-total text-primary text-end py-md-4 pe-md-4"
        >
          ${Math.round(quantity * product.Price * 100) / 100}
        </td>
      </tr>
    </>
  );
};

export default CartItem;
