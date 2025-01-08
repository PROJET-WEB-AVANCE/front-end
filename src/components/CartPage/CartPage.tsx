import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart, updateCartItemQuantity } from "../../services/cart.service";
import { getCurrentSession } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./CartPage.scss";

const CartPage: React.FC = () => {
    const [cart, setCart] = useState(getCart());
    const session = getCurrentSession();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCartUpdate = () => {
            setCart(getCart());
        };

        window.addEventListener("cart-updated", handleCartUpdate);
        return () => {
            window.removeEventListener("cart-updated", handleCartUpdate);
        };
    }, []);

    const handleRemove = (name: string) => {
        removeFromCart(name);
        toast.success(`Removed ${name} from cart`);
    };

    const handleClear = () => {
        clearCart();
        toast.success("Cart cleared");
    };

    const handleQuantityChange = (name: string, quantity: number) => {
        if (!Number.isInteger(quantity) || quantity < 1) {
            toast.error("Quantity must be a positive integer");
            return;
        }
        updateCartItemQuantity(name, quantity);
    };

    const handleCheckout = () => {
        if (!session) {
            toast.error("Please log in to place an order");
            navigate("/login");
            return;
        }

        const orderItems = cart.items.map((item) => ({
            articleName: item.article?.name || "Unknown",
            quantity: item.quantity,
        }));

        console.log("Order sent to backend:", orderItems);

        toast.success("Order placed successfully!");
        clearCart();
    };

    return (
        <div className="container py-5">
            <h1>Your Cart</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty. Start shopping now!</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cart.items.map((item) => (
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                                key={item.article?.name || "unknown"}
                            >
                                <div>
                                    <strong>{item.article?.name || "Unknown"}</strong>
                                    <p className="mb-0 text-muted">
                                        ${item.article?.price.toFixed(2) || "0.00"} x {item.quantity}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm me-2"
                                        style={{ width: "70px" }}
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.article?.name || "", parseInt(e.target.value, 10))
                                        }
                                    />
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(item.article?.name || "")}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${cart.total.toFixed(2)}</h3>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-warning" onClick={handleClear}>
                            Clear Cart
                        </button>
                        <button className="btn btn-success" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
