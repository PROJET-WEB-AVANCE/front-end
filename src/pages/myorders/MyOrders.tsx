import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AllOrderDto, Estatus, OrderDto} from "../../models/order";
import {deleteOrder, getMyOrders, getOrders, validateOrder} from "../../services/order.service";
import {getCurrentSession} from "../../services/auth.service";
import {ERole, UserDto} from "../../models/auth";
import toast from "react-hot-toast";

function MyOrders() {

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

        const fetchOrders = async () => {
            setLoading(true);
            try {
                let orders = await getMyOrders();

                orders = orders?.filter((order: AllOrderDto) => order.userId.id === session.id) || [];

                setOrders(orders);
                setTotalOrders(orders.length);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);

    const pendingOrders = orders?.filter(order => order.status === Estatus.PENDING) || [];
    const acceptedOrders = orders?.filter(order => order.status === Estatus.ACCEPTED) || [];
    const deletedOrders = orders?.filter(order => order.status === Estatus.DELETED) || [];

    const handleDeleteOrder = async (orderId: number) => {
        const deletedOrder = await deleteOrder(orderId);
        setOrders((prevOrders) => prevOrders?.map((order) =>
            order.id === orderId ? { ...order, status: Estatus.DELETED } : order
        ) || []);
        toast.success("Order successfully deleted");
        return deletedOrder;
    };


    return (
        <div className="container py-5">
            <h3 className="mt-5">Liste des commandes</h3>

            {loading ? (
                <p>Chargement des commandes...</p>
            ) : (
                <>
                    {pendingOrders.length > 0 && (
                        <div>
                            <h4>Commandes en Attente</h4>
                            <ul className="list-group">
                                {pendingOrders.map((order) => (
                                    <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Commande #{order.id}</strong>
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
                                            <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>
                                                Annuler
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {acceptedOrders.length > 0 && (
                        <div>
                            <h4>Commandes Acceptées</h4>
                            <ul className="list-group">
                                {acceptedOrders.map((order) => (
                                    <li key={order.id} className="list-group-item">
                                        <div>
                                            <strong>Commande #{order.id}</strong>
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
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {deletedOrders.length > 0 && (
                        <div>
                            <h4>Commandes Supprimées</h4>
                            <ul className="list-group">
                                {deletedOrders.map((order) => (
                                    <li key={order.id} className="list-group-item">
                                        <div>
                                            <strong>Commande #{order.id}</strong>
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
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {/* Pagination */}
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
export default MyOrders;

