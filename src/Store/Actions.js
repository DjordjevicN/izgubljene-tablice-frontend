import Axios from 'axios'
import * as notifications from '../components/Notifications'
// let hosting = "http://localhost:3001"
let hosting = "http://api.izgubljene-tablice.com"



// GET USER
export const getMyData = (value) => {
    let userToken = localStorage.getItem('userToken');
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`${hosting}/getMyData`, {
            headers: {
                authorization: userToken
            }
        });
        if (response.data.results.length <= 0) {

            dispatch({
                type: "LOADING_FALSE"
            })
        } else {
            dispatch({
                type: 'LOGIN_USER',
                payload: response.data.results[0]
            })

            dispatch({
                type: "LOADING_FALSE"
            })
        }
    }
}
export const findNumberplate = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.get(`${hosting}/findNumberplate/${value}`);
        console.log(response
        );
        if (response.data.results > 0) {
            notifications.success(response.data.message)
        } else {
            notifications.fail("Tablica nije pronadjenas")
        }
        dispatch({
            type: 'SET_FOUND_NUMBER_PLATES',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const getPlatesIPosted = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.get(`${hosting}/getPlatesIPosted/${value}`);
        dispatch({
            type: 'PLATES_I_FOUND',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const plateChecker = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.get(`${hosting}/plateChecker/${value}`);
        if (response.data.success) {
            notifications.info(response.data.message)
        } else {
            notifications.fail(response.data.message)
        }
        dispatch({
            type: 'SET_MATCHED_PLATE',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const createLostPlate = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })

        let response = await Axios.post(`${hosting}/createLostPlate`, { value })
        if (response.data.success) {
            notifications.success(response.data.message)
        } else {
            notifications.fail(response.data.message)
        }
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const createFoundPlate = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        if (value.address) {
            const response = await Axios.get(` https://api.opencagedata.com/geocode/v1/json?q=${value.address}&key=${process.env.GEOKEY}`)

            if (response.data.results.length > 0 && response.data.results[0].geometry) {
                value.latitude = response.data.results[0].geometry.lat
                value.longitude = response.data.results[0].geometry.lng
            }
        }
        let response = await Axios.post(`${hosting}/createFoundPlate`, { value })
        if (response.data.success) {
            notifications.success(response.data.message)
        } else {
            notifications.fail(response.data.message)
        }
        dispatch({
            type: 'SET_NEW_PLATE',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })

    }
}
// LOGIN USER
export const loginUser = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post(`${hosting}/loginUser`, { value });
        if (response.data.success) {
            notifications.success(response.data.message)
        } else {
            notifications.fail(response.data.message)
        }
        if (response.data.results.length <= 0) {
            dispatch({
                type: "LOADING_FALSE"
            })
        } else {
            dispatch({
                type: 'LOGIN_USER',
                payload: response.data.results[0]
            })

            dispatch({
                type: 'SET_LOCAL_STATE_TOKEN',
                payload: response.data.token
            })

        }
    }
}
export const createUser = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post(`${hosting}/createUser`, { value })

        if (response.data.success) {

            notifications.success(response.data.message)
            const login = await Axios.post(`${hosting}/loginUser`, { value });
            dispatch({
                type: 'LOGIN_USER',
                payload: login.data.results[0]
            })

        } else {
            notifications.fail(response.data.message)
        }


        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}

// LOGOUT USER
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT_USER"
        })
        dispatch({
            type: 'SET_LOCAL_STATE_LOGOUT'
        })
    }
}
export const getStats = () => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`${hosting}/getStats`);

        dispatch({
            type: "SET_GLOBAL",
            payload: response.data.results[0]
        })
        dispatch({
            type: "LOADING_FALSE"
        })
    }
}
export const addGlobalLost = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.post(`${hosting}/addGlobalLost`, { value });
        dispatch({
            type: "LOADING_FALSE"
        })
    }
}
export const addGlobalFound = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.post(`${hosting}/addGlobalFound`, { value });
        dispatch({
            type: "LOADING_FALSE"
        })
    }
}
