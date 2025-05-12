import MainLayout from "@layouts/mainLayout/MainLayout";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const Home = lazy(() => import('@pages/Home'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Categories = lazy(() => import('@pages/Categories'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Products = lazy(() => import('@pages/Products'));
const AllProducts = lazy(() => import('@pages/AllProducts'));
const ErrorPage = lazy(() => import('@pages/errorPage/ErrorPage'));
const Cart = lazy(() => import('@pages/Cart'));
const WishList = lazy(() => import('@pages/WishList'));

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'about-us',
                element: <AboutUs/>
            },
            {
                path: 'categories',
                element: <Categories/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'categories/products/:prefix',
                element: <Products/>,
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
                element: <AllProducts/>
            },
            {
                path: 'shopping-cart',
                element: <Cart/>
            },
            {
                path: 'wishList',
                element: <WishList/>
            },
        ]
    }
])


const AppRouter = () => {
    return <RouterProvider router={routes}/>
}

export default AppRouter;