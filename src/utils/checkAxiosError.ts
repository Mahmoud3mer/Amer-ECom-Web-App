import axios from "axios";

const checkError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || error.response?.data.message || error.message;
    }else{
        return 'An unexpected error.'
    }
}

export default checkError;