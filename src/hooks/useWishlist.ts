import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cleanUp, getWishlistProducts } from "@store/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
    const { wishlistProducts, loading, error } = useAppSelector(state => state.wishlist);
    const items = useAppSelector(state => state.cart.items)
    const wishlistItemsIds = useAppSelector(state => state.wishlist.itemsId);
    const dispatch = useAppDispatch();
  
    const refactorProducts = wishlistProducts?.map((el) => ({
      ...el,
      quantity: items[el.id] || 0,
      isLiked: wishlistItemsIds.includes(el.id),
    }))
  
    useEffect(() => {
      dispatch(getWishlistProducts());
  
      return () => {
        dispatch(cleanUp())
      };
    }, [dispatch]);

    return {refactorProducts, loading, error};
}

export default useWishlist;