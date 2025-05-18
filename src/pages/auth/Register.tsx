import { Button, Form } from "react-bootstrap";
import styles from './styles.module.css';
import { Link, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { signUpSchema, TInputsRegister } from "@validations/schemas/registerSchema";
import Input from "@components/forms/Input";
import { Helmet } from "react-helmet";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

// const signUpSchema = z.object({
//   firstName: z.string().min(3, {message: "First name must have 3 characters at least."}),
//   lastName: z.string().min(3, {message: "Last name must have 3 characters at least."}),
//   email: z.string().min(1, {message: "Email is required."}).email(),
//   password: z.string().min(8, {message: 'Password must have 8 characters at least.'})
//   .regex(/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/,{
//     message: 'Password must have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character.'
//   }),
//   confirmPassword: z.string().min(1, {message: "Confirm password is required."}),
// }).refine(input => input.password === input.confirmPassword, {
//   message: 'Password and confirm password does not match.',
//   path: ['confirmPassword']
// });

// type TInputs = {
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
//   confirmPassword: string,
// }

// type TInputs = z.infer <typeof signUpSchema>;


const Register = () => {

  const {
    register,
    handleSubmit, 
    formState: {errors},
    getFieldState,
    trigger,
  } = useForm<TInputsRegister>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });

  const submit: SubmitHandler<TInputsRegister> = (data) => {
    console.log(data)
  };

  const { emailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability} = useCheckEmailAvailability();

  const handleOnBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger('email');
    const { invalid, isDirty} = getFieldState('email');
    // console.log(invalid, isDirty);
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
    
  }
  const { pathname } = useLocation();
  
  return (
    <div className={styles.formContainer}>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>

      <div>
        <h2>Sign Up</h2>
      </div>
      <Form style={{width:"60%"}} onSubmit={handleSubmit(submit)}>
        {/* <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" {...register('firstName')} isInvalid={!!errors.firstName}/>

          <Form.Control.Feedback type="invalid">
                {errors?.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        <Input label="First Name" type="text" name="firstName" register={register} error={errors?.firstName?.message}/>

        <Input label="Last Name" type="text" name="lastName" register={register} error={errors?.lastName?.message}/>

        <Input
          label="Email" 
          type="email" 
          name="email" 
          register={register} 
          error={
            errors?.email?.message? errors?.email?.message : 
            emailAvailabilityStatus === 'notAvailable' ? 'This email is already in use.' : 
            emailAvailabilityStatus === 'failed' ? 'Error from the server.' : ''
          } 
          onBlur={handleOnBlur}
          formText={
            emailAvailabilityStatus === "checking"
              ? "We're currently checking the availability of this email address. Please wait a moment."
              : ""
          }
          success={
            emailAvailabilityStatus === "available"
              ? "This email is available for use."
              : ""
          }
            disabled={emailAvailabilityStatus === "checking" ? true : false}
          />

        <Input label="Password" type="password" name="password" register={register} error={errors?.password?.message}/>

        <Input label="Confirm password" type="password" name="confirmPassword" register={register} error={errors?.confirmPassword?.message}/>

        <Button 
          variant="success" 
          type="submit" 
          disabled={
            errors.email?.message || errors.firstName?.message || errors.lastName?.message || errors.password?.message || errors.confirmPassword?.message? true : 
            emailAvailabilityStatus === 'checking' ? true : false
          }
          >
          Sign Up
        </Button>
      </Form>

      <div className={styles.haveAccount}>
        Already have an account? <Link to={'/login'}>Log In</Link>
      </div>
    </div>
  )
}

export default Register