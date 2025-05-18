
import { Button, Form } from "react-bootstrap"
import styles from './styles.module.css';
import { Link, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { signInSchema, TInputsLogin } from "@validations/schemas/loginSchema";
import Input from "@components/forms/Input";
import { Helmet } from 'react-helmet';

const Login = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<TInputsLogin>({
      mode: 'onBlur',
      resolver: zodResolver(signInSchema),
    });
    
    const submit: SubmitHandler<TInputsLogin> = (data) => {
      console.log(data)
    };

    const { pathname } = useLocation();

    console.log(watch('email'));

  return (
    <div className={styles.formContainer} onSubmit={handleSubmit(submit)}>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>
      <div>
        <h2>Log In</h2>
      </div>
      <Form style={{width:"60%"}}>

        <Input label="Email" type="email" name="email" register={register} error={errors?.email?.message}/>

        <Input label="Password" type="password" name="password" register={register} error={errors?.password?.message}/>

        <Button
          variant="success"
          type="submit" 
          disabled={
            errors.email?.message || errors.password?.message ? true : false
          }
          >
          Log In
        </Button>
      </Form>

      <div className={styles.haveAccount}>
       Don't have an account? <Link to={'/register'}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Login;