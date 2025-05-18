import Lottie from "lottie-react"
import notFound from '@assets/Lotties/errorPage.json';
import loading from '@assets/Lotties/loading.json';
import error from '@assets/Lotties/errorMessage.json';
import empty from '@assets/Lotties/empty.json';


const lottieMap = {
    notFound,
    loading,
    error,
    empty,
}

interface LottieInterface {
    type: keyof typeof lottieMap;
    message?: string | null;
}

const LottieHandler = ({ type, message }: LottieInterface) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {
                type === 'error' ?
                    <Lottie animationData={lottieMap[type]} style={{ width: '70%' }} /> :
                    <Lottie animationData={lottieMap[type]} />
            }
            {
                message && <div style={{ fontSize: '20px' }}>{message}</div>
            }
        </div>
    )
}

export default LottieHandler