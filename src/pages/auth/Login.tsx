
import { Button, Form, Alert, Spinner } from "react-bootstrap"
import styles from './styles.module.css';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { signInSchema, TInputsLogin } from "@validations/schemas/loginSchema";
import Input from "@components/forms/Input";
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogIn, resetUI } from "@store/authSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<TInputsLogin>({
      mode: 'onBlur',
      resolver: zodResolver(signInSchema),
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const submit: SubmitHandler<TInputsLogin> = (data) => {
      console.log(data)
      dispatch(authLogIn(data)).unwrap().then(() => {
        toast.success('Successfully log in.');
        navigate('/');
      }).catch((error) => {
        console.log(error);
        
        toast.error(error);
      });
    };

    const { userInfo, loading, error, accessToken } = useAppSelector(state => state.auth);

    const { pathname } = useLocation();

    useEffect(() => {
      return () => {
        dispatch(resetUI())
      };
    }, [dispatch])

    if (accessToken) {
      return <Navigate to={'/'}/>
    }

  return (
    <div className={styles.formContainer} onSubmit={handleSubmit(submit)}>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>
      {
        userInfo?.email && <Alert variant="success">Your account created successfully, please log in.</Alert>
      }
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
            errors.email?.message || errors.password?.message ? true : loading === 'pending'? true : false
          }
          >
          {
            loading === 'pending' ?
              <>
                <Spinner animation="border" variant="success" size="sm" />loading...
              </> : 'Log In'
          }
        </Button>

        {
          error ?
            <div style={{color: '#DC3545', marginTop: '10px'}}>
              {error}
            </div> : ''
        }

      </Form>

      <div className={styles.haveAccount}>
       Don't have an account? <Link to={'/register'}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Login;