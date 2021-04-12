export const authLogin=(data)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:data
    }
}

export const authLogout=()=>{
    localStorage.removeItem('tkn_id')
    return{
        type:"LOGOUT"
    }
}

export const keepLogin=(data)=>{
    return {
        type:'LOGIN_SUCCESS',
        payload:data
    }
}

export const updateCart=(data)=>{
    return {
        type:"UPDATE_CART",
        payload:data
    }
}