import { cleanUp, decreaseQuantity, getCartProducts, increaseQuantity, removeItemFromCategory } from "@store/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetLoadingStatus } from "@store/ordersSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, items, loading, error } = useAppSelector(state => state.cart);
  const wishlistItemsIds = useAppSelector(state => state.wishlist.itemsId);
  const refactorProducts = productsFullInfo.map((el) => {
    return {
      ...el,
      quantity: items[el.id] || 0,
      isLiked: wishlistItemsIds.includes(el.id),
    }
  })

  const { accessToken } = useAppSelector(s => s.auth);
  const orderPlacingStatus = useAppSelector(s => s.orders.loading);
  const { pathname } = useLocation();
  
    useEffect(() => {
      return () => {
        dispatch(resetLoadingStatus())
      };
    }, [dispatch])

  useEffect(() => {
    const promise = dispatch(getCartProducts())

    return () => {
      dispatch(cleanUp())
      promise.abort();
    }
  }, [dispatch]);

  const handleDecreaseQuantity = (productId: number | string, quantity: number) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity({ productId, quantity }))
    }
  }
  const handleIncreaseQuantity = (productId: number | string, quantity: number, max: number) => {
    if (quantity < max) {
      dispatch(increaseQuantity({ productId, quantity }))
    }
  }
  const handlRemoveItemFromCategory = (productId: number | string) => {
    dispatch(removeItemFromCategory({ productId }))
  }

  return {
    refactorProducts,
    loading, error,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handlRemoveItemFromCategory,
    accessToken,
    pathname,
    orderPlacingStatus
  };
}


export default useCart;