import api from "@services/api";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
    const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>('idle');

    const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

    const checkEmailAvailability = async (email: string) => {
        setEnteredEmail(email);
        setEmailAvailabilityStatus('checking');

        try {
            const response = await api.get(`/users?email=${email}`);
console.log(response.data);

            if (response.data.length > 0) {
                setEmailAvailabilityStatus('notAvailable');
                // setEmailAvailabilityStatus('available');
            }else{
                // setEmailAvailabilityStatus('notAvailable');
                setEmailAvailabilityStatus('available');
            }
        } catch (error) {
            setEmailAvailabilityStatus('failed');
        }
    }

    const resetCheckEmailAvailability = () => {
        setEmailAvailabilityStatus('idle');
        setEnteredEmail(null);
    }

    return { emailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability};

}

export default useCheckEmailAvailability;