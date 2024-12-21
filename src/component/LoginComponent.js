import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/accountStudent";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginComponent() {
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const handleLogin = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        const loginInfo = {
            username: username,
            password: password
        }
        console.log(loginInfo);
        let isLoginSuccess = await dispatch(login(loginInfo));
        if (isLoginSuccess) {
            toast.success("Đăng nhập thành công", {
                autoClose: 1000
            })
            navigate("/student")
        } else {
            toast.error("Đăng nhập thất bại", {
                autoClose: 1000
            })
        }
    }
    return (
        <>
            <form>
                <h3>Login</h3>
                <div>
                    <label>UserName</label>
                    <input ref={usernameRef} name={'username'} />
                </div>
                <div>
                    <label>PassWord</label>
                    <input ref={passwordRef} name={'password'} />
                </div>
                <div>
                    <button onClick={handleLogin} type={"button"}>Login</button>
                </div>
            </form>
        </>
    )
}
export default LoginComponent;