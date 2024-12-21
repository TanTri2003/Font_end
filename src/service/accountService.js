import axios from "axios";

export async function checkLogin(loginInfor) {
    try{
        const response = await axios.get("http://localhost:8800/accounts");
        const account = response.data.find(ac => ac.username == loginInfor.username && ac.password == loginInfor.password);
        console.log("--------vxvxvxvxz------------");
        console.log(account);
        
        if (account!=null){
            return account;
        }else {
            return null
        }
    }catch (e) {
        return null;
    }

}