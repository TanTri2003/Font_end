import React, { useRef } from 'react'
import { addComponent } from '../service/studentService';
import { useNavigate } from 'react-router-dom';

function AddComponent() {
    let nameRef = useRef();
    let phoneRef = useRef();
    let emailRef = useRef();
    const navigate = useNavigate()
    const handleAddStudent =()=>{
        const students ={
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value
        }
        addComponent(students)
        navigate('/products')
    }
    return (
        <>
            <h2>Add Students</h2>
            <form>
                <input ref={nameRef} placeholder='Nhập name'></input>
                <input ref={phoneRef} placeholder='Nhập số điện thoại'></input>
                <input ref={emailRef} placeholder='Nhập Email'></input>
                <button type='button' onClick={handleAddStudent}>Sever</button>
            </form>
        </>
    )
}
export default AddComponent;