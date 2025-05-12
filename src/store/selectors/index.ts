import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const getCartTotalQuantitySelector = createSelector((state: RootState) => state.cart.items, (items) => {
    const totalQuantity: number = Object.values(items).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0) 

    return totalQuantity;
})

const getWishlistTotalQuantitySelector = createSelector((state: RootState) => state.wishlist.itemsId, (items) => {
    const totalQuantity: number = items.length

    return totalQuantity;
})

export { getCartTotalQuantitySelector, getWishlistTotalQuantitySelector };