import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getAllProducts, productsCleanUp } from "@store/productsSlice";
import { useEffect } from "react";

const useAllProducts = () => {
    const { products, loading, error } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.cart.items);
    const wishlistItemsIds = useAppSelector(state => state.wishlist.itemsId);
    
    const refactorProducts = products.map((el) => ({
      ...el,
      quantity: items[el.id] || 0,
      isLiked: wishlistItemsIds.includes(el.id),
    }))
  
    useEffect(() => {
      const promise = dispatch(getAllProducts());
  
      return () => {
        dispatch(productsCleanUp());
        promise.abort();
      }
    }, [dispatch]);

    return { refactorProducts, loading, error};
}

export default useAllProducts;