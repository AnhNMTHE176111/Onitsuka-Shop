import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import './main.css'

const CreateUser = () => {
    const navigate = useNavigate();
    const defaultUser = {
        id: 0,
        username: '',
        password: '',
        role: 0
    }
    const [listUser, setListUser] = useState([]);
    const [User, setUser] = useState(defaultUser);
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('admin');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [isChange, setIsChange] = useState(true);

    useEffect(() => {
        fetch("http://localhost:9999/User")
            .then((res) => res.json())
            .then((result) => {
                setListUser(result);
            });
    }, [isChange])

    const handleCreate = async () => {
        if (username === "" ||
            role === "" ||
            password === "" ||
            repassword === "") {
            alert("Please enter complete information");
        }
        else if(username.includes(' ')) {
            alert("Username must not include spaces");
        }
        else if (password.length < 3) {
            alert("Password must be at least 3 characters");
        }
        else if (password !== repassword) {
            alert("Password and RePassword is incorrect");
        }
        else {
            const data = [...listUser];
            let User = data.filter(item => item.username.toLowerCase() === username.toLowerCase());
            console.log(User);
            if (User.length > 0) {
                alert("User Existed");
                setIsChange(!isChange)
            }
            else {
                let newUser = {
                    username: username,
                    role: role,
                    password: password
                }

                await fetch("http://localhost:9999/User", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                });
                setIsChange(!isChange)
                alert("Add new User Successfully")
            }
        }
    }

    return (
        <div style={{ margin: '' }} className='col-12 justify-content-center d-flex'>
            <Container fluid className='col-8 my-5'>
                <Row>
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Create User</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="username">Name:</label>
                                        <input required type="text" className="form-control"
                                            id="username"
                                            onChange={e => setUserName(e.target.value.trim())} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input required type="text" className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value.trim())}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="repassword">RePassword:</label>
                                        <input required type="text" className="form-control"
                                            id="repassword"
                                            value={repassword}
                                            onChange={e => setRePassword(e.target.value.trim())}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="role">Role:</label>
                                        <select name="role" id="role" className='form-control'
                                            onChange={(e) => {
                                                console.log(e.target.value);;
                                                setRole(e.target.value)
                                            }}>
                                            <option value="admin">Admin</option>
                                            <option value="customer">Customer</option>
                                        </select>
                                    </div>
                                </Col>

                            </Row>
                            <Button style={{ marginTop: "10px", marginRight: '20px' }}
                                onClick={() => navigate('/admin')}
                                className='btn btn-success'
                            >
                                Admin Home
                            </Button>
                            <Button style={{ marginTop: "10px" }}
                                onClick={() => handleCreate()}>
                                Create New User
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateUser