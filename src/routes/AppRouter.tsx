import MainLayout from "@layouts/mainLayout/MainLayout";
import ProfileLayout from "@layouts/profileLayout/ProfileLayout";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import('@pages/home/Home'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Categories = lazy(() => import('@pages/Categories'));
const Login = lazy(() => import('@pages/auth/Login'));
const Register = lazy(() => import('@pages/auth/Register'));
const Products = lazy(() => import('@pages/Products'));
const AllProducts = lazy(() => import('@pages/AllProducts'));
const Cart = lazy(() => import('@pages/Cart'));
const WishList = lazy(() => import('@pages/WishList'));
const Account = lazy(() => import('@pages/account/Account'));
const Orders = lazy(() => import('@pages/Orders'));

import ErrorPage from "@pages/errorPage/ErrorPage";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import ProtectedRoute from "@components/auth/ProtectedRoute";

const lottie = <LottieHandler type={'loading'} />

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Suspense fallback={lottie}><Home /></Suspense>
            },
            {
                path: 'about-us',
                element: <Suspense fallback={lottie}><AboutUs /></Suspense>
            },
            {
                path: 'categories',
                element: <Suspense fallback={lottie}><Categories /></Suspense>
            },
            {
                path: 'login',
                element: <Suspense fallback={lottie}><Login /></Suspense>
            },
            {
                path: 'register',
                element: <Suspense fallback={lottie}><Register /></Suspense>
            },
            {
                path: 'categories/:prefix',
                element: <Suspense fallback={lottie}><Products /></Suspense>,
                loader: ({ params }) => {
                    if (typeof params.prefix !== 'string' || !/^[a-z]+$/i.test(params.prefix)) {
                        throw new Response("Bad request", {
                            statusText: 'Category not found.',
                            status: 400,
                        })
                    }
                    return true;
                }
            },
            {
                path: 'products',
                element: <Suspense fallback={lottie}><AllProducts /></Suspense>
            },
            {
                path: 'shopping-cart',
                element: <Suspense fallback={lottie}><Cart /></Suspense>
            },
            {
                path: 'wishList',
                element: <ProtectedRoute>
                    <Suspense fallback={lottie}><WishList /></Suspense>
                </ProtectedRoute>
            },
            {
                path: 'profile',
                element: (<ProtectedRoute>
                    <Suspense fallback={lottie}><ProfileLayout /></Suspense>
                </ProtectedRoute>),
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute>
                            <Suspense fallback={lottie}><Account /></Suspense>
                        </ProtectedRoute>
                    },
                    {
                        path: 'orders',
                        element: <ProtectedRoute>
                            <Suspense fallback={lottie}><Orders /></Suspense>
                        </ProtectedRoute>
                    }
                ]
            }
        ]
    }
])


const AppRouter = () => {
    // const [showIntro, setShowIntro] = useState(true);
    // useEffect(() => {
    //     const timer = setTimeout(() => setShowIntro(false), 3000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <>
            {/* {
                showIntro ?
                    <IntroLoader /> :
                    <RouterProvider router={routes} />
            } */}
            <RouterProvider router={routes} />

        </>
    )
}

export default AppRouter;