import { useAppDispatch, useAppSelector } from "@store/hooks"
import { getWishlistProducts } from "@store/wishlistSlice";
import { useEffect } from "react";

const WishList = () => {
  const { wishlistProducts } = useAppSelector(state => state.wishlist);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWishlistProducts());
  }, [dispatch])

  return (
    <div>WishList</div>
  )
}

export default WishList