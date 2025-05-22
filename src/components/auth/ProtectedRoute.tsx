import { useAppSelector } from "@store/hooks"
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAppSelector(s => s.auth);
    if (!accessToken) {
        toast.error('Log in required.');
        return <Navigate to={'/login'} />
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute