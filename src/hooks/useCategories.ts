import { getCategories } from "@store/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
    const { categories, loading, error } = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch])

  return { categories, loading, error };
}

export default useCategories;