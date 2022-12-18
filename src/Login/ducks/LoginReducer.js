const UPDATE_LOGGED_IN = 'assessment/login/update_logged_in'

const initialState = {
    loggedIn : false,
    userName: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOGGED_IN: 
            return {...state, loggedIn : action.value.loggedIn, userName: action.value.userName};
        default:
            return state;
    }
};


export const updateLoggedIn = (value) => ({
    type: UPDATE_LOGGED_IN,
    value: value
})