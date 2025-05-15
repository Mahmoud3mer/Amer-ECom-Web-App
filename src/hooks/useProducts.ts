import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getProductsCategory, productsCleanUp } from "@store/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
    const { productsCategory, loading, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items)
  const wishlistItemsIds = useAppSelector(state => state.wishlist.itemsId);
  const params = useParams();

  const refactorProducts = productsCategory.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLiked: wishlistItemsIds.includes(el.id),
  }))
  
  
  useEffect(() => {
    let prefix: string;
    if (params.prefix && typeof params.prefix === 'string') {
      prefix = params.prefix;
      dispatch(getProductsCategory(prefix));
    }

    return () => {
      dispatch(productsCleanUp());
    }
  }, [dispatch, params]);

  return {refactorProducts, loading, error};
}

export default useProducts;