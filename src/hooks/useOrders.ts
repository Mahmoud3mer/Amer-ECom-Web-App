import { ProductInterface } from "@inerfaces/interfaces";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cleanUpOrders, getOrders } from "@store/ordersSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useOrders = () => {
     const { pathname } = useLocation();
    const { orders, loading, error } = useAppSelector(s => s.orders);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [orderInfo, setOrderInfo] = useState<ProductInterface[]>([]);

    useEffect(() => {
        const promise = dispatch(getOrders());

        return () => {
            promise.abort();
            dispatch(cleanUpOrders());
        }
    }, [dispatch]);

    const handleShowProduct = (orderId: number | string) => {
        setShowModal(true);
        const order = orders.find((o) => o.id === orderId);
        const items = order?.items ?? [];

        setOrderInfo(items);
        console.log(orderInfo);
        
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return {
        pathname,
        loading,
        error,
        showModal,
        handleCloseModal,
        handleShowProduct,
        orderInfo,
        orders,
    }
}

export default useOrders;