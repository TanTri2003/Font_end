import React, { useEffect, useRef, useState } from 'react';
import { deleteStudentById, getAllStudent, searchStudentByName } from '../service/studentService';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllCountry } from '../service/conutryService';

function ListComponent() {
    const [studentList, setStudents] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const account = useSelector(state => state.user.account)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [deleteStudent, setDeleteStudent] = useState({ id: "", name: "" })
    const searchRef = useRef()
    const searchCountryRef = useRef()
    useEffect(() => {
        const fectchData = async () => {
            const list = await getAllStudent()
            setStudents(list)
        }
        const fectchDataCountry = async () => {
            const list = await getAllCountry()
            setCountryList(list)
        }
        fectchData()
        fectchDataCountry()
    }, [isLoading])
    const handleClose = () => {
        setShow((pre) => !pre)
    }
    const handleShow = (students) => {
        setShow((pre) => !pre)
        setDeleteStudent(students)
    }
    const handleDelete = () => {
        deleteStudentById(deleteStudent.id)
        setIsLoading(pre => !pre);
        handleClose()
    }
    const handleSearch = () => {
        let searchName = searchRef.current.value
        let searchCountry = searchCountryRef.current.value
        const fectchData = async () => {
            const list = await searchStudentByName(searchName,searchCountry)
            setStudents(list)
        }
        fectchData()
    }
    return (
        <>
            <h3>Danh sách học sinh</h3>
            <button ><Link style={{ color: 'white', textDecoration: 'none' }} to={'/student/creat'} >Thêm sinh viên</Link></button>
            <br />
            <br />
            <input ref={searchRef} name={'searchName'} placeholder={'Nhập tên cần tìm'} />
            <select ref={searchCountryRef}>
                <option value={""}>------Chọn---------</option>
                {countryList .map(e=>(
                    <option value={e.id}>{e.name}</option>
                ))}
            </select>
            <button onClick={handleSearch} className={'btn btn-success btn-sm'} type={'button'}>Search</button>
            <br />
            <br />
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Hobby</th>
                        <th>Country</th>
                        <th>Detail</th>
                        {account && ((account.role == "ADMIN") ?  <th>Delete</th> : '')}
                        <th>Edit</th>

                    </tr>
                </thead>
                <tbody>
                    {studentList && studentList.map((students, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{students.name}</td>
                            <td>{students.phone}</td>
                            <td>{students.email}</td>
                            <td>{students.gender}</td>
                            <td>{students.hobby}</td>
                            <td>{students.country.name}</td>
                            <td><Link to={'/student/detail/' + students.id} className={'btn btn-primary btn-sm'} >Detail</Link></td>
                            {account && ((account.role == "ADMIN") ?   <td>
                              <Button className={'btn-sm btn-danger'} variant="danger" onClick={() => {
                                    handleShow(students);
                                }}>
                                    Delete
                                </Button>
                            </td> : '')}
                            <td><button className={'btn btn-primary btn-sm'}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa {deleteStudent.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ListComponent;