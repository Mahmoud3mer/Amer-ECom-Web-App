import { cleanUp, decreaseQuantity, getCartProducts, increaseQuantity, removeItemFromCategory } from "@store/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCart = () => {
    const dispatch = useAppDispatch();
    const { productsFullInfo, items, loading, error } = useAppSelector(state => state.cart)
    const wishlistItemsIds = useAppSelector(state => state.wishlist.itemsId);
    const refactorProducts = productsFullInfo.map((el) => {
        return {
            ...el,
            quantity: items[el.id] || 0,
            isLiked: wishlistItemsIds.includes(el.id),
        }
    })

    useEffect(() => {
        dispatch(getCartProducts())

        return () => {
            dispatch(cleanUp())
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

    return { refactorProducts, loading, error, handleDecreaseQuantity, handleIncreaseQuantity, handlRemoveItemFromCategory };
}


export default useCart;