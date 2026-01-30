import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  clearCart,
  removeFromCart,
  updateQuantity
} from "../features/cart/cartSlice.js";

const CartSummary = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart">
      <div className="cart-header">
        <div>
          <h2>Cart</h2>
          <p className="muted">Review your items before checkout.</p>
        </div>
        <div className="cart-icon">
          <ShoppingBag size={18} />
        </div>
      </div>
      {items.length === 0 && <p className="muted">Cart is empty.</p>}
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <strong>{item.name}</strong>
            <span className="muted">${item.price.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <div className="qty-control">
              <button
                type="button"
                className="btn btn-ghost icon-btn"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1)
                    })
                  )
                }
              >
                <Minus size={14} />
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                className="btn btn-ghost icon-btn"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1
                    })
                  )
                }
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <>
          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        </>
      )}
    </section>
  );
};

export default CartSummary;
