import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actionCreator from '../Store/Actions'

function SignUp(props) {
    const { register, handleSubmit, errors } = useForm()
    let onSubmit = (data) => {
        props.createUser(data)

    }
    let isLoggedIn = props.authUser.id ? true : false;
    if (isLoggedIn) { return <Redirect to='/' /> }
    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='inputLabel'>Ime</p>
                    <input type="text" placeholder='Ime' name='ime' ref={register} />
                    <p className='inputLabel'>Email</p>
                    <input type="text"
                        placeholder='example@gmail.com'
                        name='email'
                        ref={register({ required: true })} />
                    <p className='inputLabel'>Password</p>
                    <input
                        type="password"
                        placeholder='Password (min 6 char)'
                        name='password'
                        ref={register({ required: "Password is required", minLength: 6, message: 'Password je kratak' })} />
                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="submit" className='submitBTN' onClick={() => {

                    }} />
                </form>
                <Link to='/login' className='link switchForm'>Imam profil</Link>
            </div>
            <div className="tut">
                <p>Mi ne šaljemo spam Email-ove niti koristimo vase podatke da vas targetiramo reklamama. Email koristimo iskljucivo kako bi znali ko je postavio tablicu ili ako ste oglasili tablicu kao izgubljenu da znamo na koji email da vas obavestimo da je tablica pronadjena a na koji da zahvalnicu pronalayaču.</p>

            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        lostPlates: state.lostNumberPlates,
        authUser: state.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (data) => dispatch(actionCreator.createUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
