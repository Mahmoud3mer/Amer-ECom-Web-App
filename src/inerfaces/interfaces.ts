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

type ILoading = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface StateInterface{
    loading: ILoading,
    error: string | null,
}

export interface WishlistInterface{
    userId: number | string,
    productId: string | number,
    id: string | number,
}