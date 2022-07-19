import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import * as actionCreator from '../Store/Actions'
function AddLostPlate(props) {
    const { register, handleSubmit, errors } = useForm()
    const [inputActive, setInputActive] = useState(true)
    let total_lost_plates = props.total_lost_plates
    let onSubmit = (data) => {
        let newTotal = total_lost_plates + 1;
        data.owner_id = props.authUser.id;
        data.found = 0
        setInputActive(false)
        props.createLostPlate(data)
        props.addGlobalLost(newTotal)
        setTimeout(function () { window.location = '/' }, 3000);
        setTimeout(function () { setInputActive(true) }, 3000);
    }
    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Oglasi Tablicu</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='inputLabel'>Broj tablice</p>
                    <input type="text"
                        placeholder='BG432CS'
                        name='plateNumber'
                        ref={register({ required: true })} />
                    <p className='inputLabel'>Poruka</p>
                    <input
                        type="textarea"
                        placeholder='Ostavite poruku'
                        name='message'
                        ref={register({ required: true })} />
                    {errors.password && <p>{errors.password.message}</p>}
                    {/* <input type="submit" className='submitBTN inputActive' /> */}
                    <input type="submit" className={inputActive ? ' submitBTN ' : 'submitBTN inputBlock'} />
                </form>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {

    return {
        authUser: state.authUser,
        total_lost_plates: state.plateGlobal.total_lost_plates
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createLostPlate: (data) => dispatch(actionCreator.createLostPlate(data)),
        addGlobalLost: (newTotal) => dispatch(actionCreator.addGlobalLost(newTotal)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddLostPlate);


