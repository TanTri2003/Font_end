// viet ham tra ve student {type: ,payload}
// account={
//     username:"",
//     password:"",
//     role:""

import { checkLogin } from "../service/accountService"

// }
export function login(loginInfo) {
    return async (dispatch) => {
        const account = await checkLogin(loginInfo)
        console.log("------------------------------------------");
        
        console.log(account);
        
        if(account!==null){
            dispatch({
                type: "LOGIN",
                payload: account
            })
            return true;
        }else{
            console.log("Login không thành công");
            return false;
            
        }
    }
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: null
    }
}