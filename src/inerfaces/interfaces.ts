export interface CategoryInterface{
    id: string | number,
    img: string,
    title: string,
    prefix: string,
}

export interface ProductInterface{
    id: string | number;
    title: string;
    price: number;
    cat_prefix: string;
    img: string | null;
    quantity?: number;
    max: number;
    isLiked: boolean;
}

export type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface StateInterface{
    loading: TLoading,
    error: string | null,
}

export interface WishlistInterface{
    userId: number | string,
    productId: string | number,
    id: string | number,
}

export interface OrderInterface{
    userId: number | string,
    items: Array<ProductInterface>,
    subtotal: number,
    id: number | string,
}