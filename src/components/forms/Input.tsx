import { Form } from "react-bootstrap"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TInputProps<TFieldValue extends FieldValues> = {
    label: string,
    type?: string,
    name: Path<TFieldValue>,
    register: UseFormRegister<TFieldValue>,
    error?: string,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    formText?: string,
    success?: string,
    disabled?: boolean,
}

const Input = <TFieldValue extends FieldValues>({ label, name, type = 'text', register, error, onBlur, success, formText, disabled } : TInputProps<TFieldValue>) => {
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e);
            register(name).onBlur(e);
        }else{
            register(name).onBlur(e);
        }
    }

    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{ label }</Form.Label>
            <Form.Control 
                type={type} 
                {...register(name)} 
                isInvalid={!!error} 
                onBlur={onBlurHandler}
                isValid={success ? true : false}
                disabled={disabled ? true : false}
                />

            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
            {formText && <Form.Text muted>{formText}</Form.Text>}
        </Form.Group>
    )
}

export default Input;