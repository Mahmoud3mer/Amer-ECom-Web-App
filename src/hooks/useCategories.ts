import { getCategories } from "@store/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
    const { categories, loading, error } = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (!categories.length) {
    //   dispatch(getCategories());
    // }
    const promise = dispatch(getCategories());

    return () => {
      promise.abort();
    }
  }, [dispatch])

  return { categories, loading, error };
}

export default useCategories;