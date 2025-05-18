import CategorySkeleton from "./Skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "./Skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "./Skeletons/CartSkeleton/CartSkeleton";
import LottieHandler from "./LottieHandler/LottieHandler";

const skeltonType = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton,
}

interface LoadingInterface{
    loading: string;
    error: string | null;
    children:  React.ReactNode;
    type?: keyof typeof skeltonType;
}

const LoaderRecords = ({ loading, error, children, type = 'category'}: LoadingInterface) => {
    const Copmonent = skeltonType[type];

    if (loading === 'pending') {
        return  <Copmonent />
    }

    if (loading === 'failed') {
        return  <LottieHandler type={'error'} message={error}/>
    }
    return (
        <>
            {/* {
                loading === 'pending' ?
                    <div className='h-full d-flex justify-content-center align-items-center'>
                        <Spinner animation="border" variant="success" />
                    </div> :
                    children
            } */}
            {/* {
                loading === 'pending' ?
                    <Copmonent /> :
                    children
            } */}

            { children }
        </>
    )
}

export default LoaderRecords