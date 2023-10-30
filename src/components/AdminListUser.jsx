import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, FormControl, Row, Table } from "react-bootstrap";
import SideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";

const AdminListUser = () => {
    const [users, setUsers] = useState([]);
    const [searchedUser, setSearchedUser] = useState([]);
    const [paggingUsers, setPaggingUsers] = useState([]);
    const [pagging, setPagging] = useState([]);
    const [isChange, setIsChange] = useState(true)
    const search = useRef("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((res) => res.json())
            .then((result) => {
                if (result.length >= 10) {
                    setPaggingUsers(result.slice(0, 10))
                }
                else {
                    setPaggingUsers(result.slice(0, result.length));
                }
                let setpagging = [];
                let end;
                if (result.length % 10 === 0) {
                    end = result.length / 10;
                } else {
                    end = result.length / 10 + 1;
                }
                for (let i = 1; i <= end; i++) {
                    setpagging = [...setpagging, i]
                }
                setPagging(setpagging);
                setSearchedUser(result);
                setUsers(result);
            })
    }, [isChange])

    useEffect(() => {
        if (searchedUser.length >= 10) {
            setPaggingUsers(searchedUser.slice(0, 10))
        }
        else {
            setPaggingUsers(searchedUser.slice(0, searchedUser.length));
        }
        let setpagging = [];
        let end;
        if (searchedUser.length % 10 === 0) {
            end = searchedUser.length / 10;
        } else {
            end = searchedUser.length / 10 + 1;
        }
        for (let i = 1; i <= end; i++) {
            setpagging = [...setpagging, i]
        }
        setPagging(setpagging);
    }, [searchedUser])

    const Pagging = (index) => {
        if (users.length > index * 10) {
            setPaggingUsers(searchedUser.slice((index - 1) * 10, index * 10))
        }
        else setPaggingUsers(searchedUser.slice((index - 1) * 10, searchedUser.length))
    }
    const SearchedList = (key) => {
        const searchedList = users.filter((p) => {
            return p.username.toLowerCase().includes(key.current.value.toLowerCase());
        });
        setSearchedUser(searchedList);
    }

    const deleteUser = async (id) => {
        const confirm = window.confirm('Do you want to delete?')
        if (confirm) {
            fetch(`http://localhost:9999/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    setIsChange(!isChange);
                })
        };
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">User Management</h1>
                        </div>
                        <div className='admin-content'>
                            <Container>
                                <Row style={{ marginBottom: "20px" }}>

                                    <Col md={6}>
                                        <div className='input-group'>
                                            <FormControl type='text' placeholder='Enter name to search'
                                                ref={search}
                                                onChange={() => SearchedList(search)} />
                                            <div className='input-group-prepend'>
                                                {/* <Button className='btn-dark'
                                                    onClick={() => SearchedList(search)}>
                                                    Search
                                                </Button> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <Link to="/createUser">
                                            <Button style={{ width: '200px' }}
                                                className='btn-success'>
                                                Create a new user
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Table>
                                            <thead
                                                style={{
                                                    backgroundColor: '#1dbd55',
                                                    color: '#fff'
                                                }}>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    paggingUsers.map((p, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{p.id}</td>
                                                                <td>{p.username}</td>
                                                                <td>{p.role}</td>
                                                                <td>
                                                                    <Link className="btn btn-danger"
                                                                        onClick={() => deleteUser(p.id)}>
                                                                        Delete</Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        <div className='pagging'>
                                            {
                                                pagging.map((p, index) => {
                                                    return (
                                                        <button key={index} className='btn btn-success'
                                                            style={{ marginLeft: "5px" }}
                                                            onClick={() => Pagging(p)}>
                                                            {p}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default AdminListUser