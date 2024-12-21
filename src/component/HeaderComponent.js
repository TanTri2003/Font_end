import React from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/accountStudent";
function HeaderComponent() {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        navigate('/student');
    }
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/student">List</Link>
                        </li>
                        <li className="nav-item">
                            {!account &&<Link class="nav-link" to="/login">Login</Link>}
                        </li>
                        <li className="nav-item">
                            {account && <button onClick={handleLogout}>Logout</button>}
                        </li>
                        <li class="nav-link">
                            {account&&account.username}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default HeaderComponent;