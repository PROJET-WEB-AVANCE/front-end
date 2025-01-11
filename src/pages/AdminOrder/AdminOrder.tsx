import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AllOrderDto, Estatus, OrderDto} from "../../models/order";
import {deleteOrder, getOrders, validateOrder} from "../../services/order.service";
import {getCurrentSession} from "../../services/auth.service";
import {ERole, UserDto} from "../../models/auth";

function AdminOrder() {

    const navigate = useNavigate();
    const [session, setSession] = useState(() => getCurrentSession());
    const [orders, setOrders] = useState<AllOrderDto[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {

        if(session === null){
            navigate("/login");
            return;
        }

        if(session?.role === ERole.ROLE_CLIENT){
            navigate("/home");
            return;
        }

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const orders = await getOrders();
                const pendingOrders = orders.filter(order => order.status === Estatus.PENDING);

                setOrders(pendingOrders);
                setTotalOrders(pendingOrders.length);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);


    const handleDeleteOrder = async (orderId: number) => {
        const deletedOrder = await deleteOrder(orderId);
        setOrders(orders!.filter(order => order.id !== orderId));
        return deletedOrder;
    };


    const handleEditOrder = (order: OrderDto) => {
        console.log("Order : ", order);
        navigate("/admin/order/edit", { state: { order } });
        return;

    };

    const handleValidateOrder = async (orderId: number) => {
        const order = await validateOrder(orderId);
        setOrders(orders!.filter(order => order.id !== orderId));
        return order;
    }

    const isAdmin = session?.role === ERole.ROLE_ADMIN;

    return (
        <div className="container py-5">
            <h2>Admin Dashboard</h2>

            <h3 className="mt-5">Liste des commandes en attente</h3>
            {loading ? (
                <p>Chargement des commandes...</p>
            ) : (
                <ul className="list-group">
                    {orders?.map((order) => (
                        <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Commande #{order.id}</strong> de {order.userId.firstName} {order.userId.lastName}


                                <br />
                                <small>Date: {new Date(order.date).toLocaleString()}</small>
                                <br />
                                <strong>Status: </strong>{order.status}
                                <br />
                                <strong>Total: </strong>{order.totalAmount}$
                                <br />
                                <strong>Articles:</strong>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.id}>
                                            {item.name} x {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-success" onClick={() => handleValidateOrder(order.id)}>
                                    Valider
                                </button>
                                {isAdmin &&
                                    <>
                                        <button className="btn btn-warning" onClick={() => handleEditOrder(order)}>
                                            Éditer
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>
                                            Supprimer
                                        </button>
                                    </>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="pagination mt-4">
                {[...Array(Math.ceil(totalOrders / ordersPerPage))].map((_, index) => (
                    <button
                        key={index}
                        className={`btn btn-link ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminOrder;

