import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Estatus, OrderDto} from "../../models/order";
import {getCurrentSession} from "../../services/auth.service";
import {ERole} from "../../models/auth";
import {updateOrder} from "../../services/order.service";
import toast from "react-hot-toast";

const EditOrder: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [session, setSession] = useState(() => getCurrentSession());
    const [order, setOrder] = useState<OrderDto | null>(null);
    const [status, setStatus] = useState<Estatus | string>("");

    useEffect(() => {

        if(!session)
            navigate("/login");

        if( session?.role !== ERole.ROLE_ADMIN)
            navigate("/home");

        if (location.state && location.state.order) {
            setOrder(location.state.order);
            setStatus(location.state.order.status);
        } else {
            navigate("/admin/order");
        }
    }, [location.state, navigate]);

    const handleSaveChanges = async () => {
        if (order) {
            const updatedOrder = {...order, status};
            setOrder(updatedOrder);
            await updateOrder(order);
            toast.success("Order successfully edited");
            navigate("/admin/order");

        }
    };

    const handleRemoveItem = (itemId: number) => {
        const updatedItems = order?.items.filter(item => item.id !== itemId);

        if (updatedItems) {

            setOrder({ ...order!, items: updatedItems });
            toast.success("Item removed successfully!");
        }
    };

    const handleQuantityChange = (itemId: number, quantity: number) => {
        if (quantity < 1) {
            toast.error("Quantity must be greater than 0.");
            return;
        }

    if (!order) {
        return <div>Loading...</div>;
    }
        const updatedItems = order?.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
        );

        if (updatedItems) {
            setOrder({ ...order, items: updatedItems });
        }
    };

    return (
        <div className="container py-5">
            <h1>Edit Order</h1>
            {order && (
                <div>
                    <h3>Order #{order.id}</h3>
                    <ul className="list-group">
                        {order.items.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{item.name}</strong>
                                    <p className="mb-0 text-muted">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm me-2"
                                        style={{width: "70px"}}
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                        }
                                    />
                                </div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="btn btn-success mt-4"
                        onClick={handleSaveChanges}
                    >
                    Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditOrder;
