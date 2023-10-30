import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, FormControl, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const AdminListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchedOrder, setSearchedOrder] = useState([]);
    const [paggingOrders, setPaggingOrders] = useState([]);
    const [pagging, setPagging] = useState([]);
    const [isChange, setIsChange] = useState(true)
    const search = useRef("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((res) => res.json())
            .then((result) => {
                let listOrder = [];
                result.map(item => {
                    if (item.order) {
                        listOrder = [...listOrder, ...item.order];
                    }
                })
                console.log(listOrder);
                return listOrder;
            })
            .then((result) => {
                if (result.length >= 10) {
                    setPaggingOrders(result.slice(0, 10))
                }
                else {
                    setPaggingOrders(result.slice(0, result.length));
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
                setSearchedOrder(result);
                setOrders(result);
            })
    }, [isChange])

    useEffect(() => {
        if (searchedOrder.length >= 10) {
            setPaggingOrders(searchedOrder.slice(0, 10))
        }
        else {
            setPaggingOrders(searchedOrder.slice(0, searchedOrder.length));
        }
        let setpagging = [];
        let end;
        if (searchedOrder.length % 10 === 0) {
            end = searchedOrder.length / 10;
        } else {
            end = searchedOrder.length / 10 + 1;
        }
        for (let i = 1; i <= end; i++) {
            setpagging = [...setpagging, i]
        }
        setPagging(setpagging);
    }, [searchedOrder])

    const Pagging = (index) => {
        if (orders.length > index * 10) {
            setPaggingOrders(searchedOrder.slice((index - 1) * 10, index * 10))
        }
        else setPaggingOrders(searchedOrder.slice((index - 1) * 10, searchedOrder.length))
    }
    const SearchedList = (key) => {
        if (key.current.value.length > 0) {
            const searchedList = orders.filter((p) => {
                return p.date.toLowerCase().includes(key.current.value.toLowerCase());
            });
            setSearchedOrder(searchedList);
        }
        else {
            const searchedList = orders;
            setSearchedOrder(searchedList);
        }
    }

    const deleteOrder = async (id) => {
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
                            <h1 className="admin-title">Order Management</h1>
                        </div>
                        <div className='admin-content'>
                            <Container>
                                <Row style={{ marginBottom: "20px" }}>

                                    <Col md={3}>
                                        <div className='form-group'>
                                            <label htmlFor="date">Choose Date Order:</label>
                                            <FormControl id="date" type='date'
                                                ref={search}
                                                onChange={() => SearchedList(search)} />
                                        </div>
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
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Amount</th>
                                                    <th>Time</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    paggingOrders.map((p, index) => {
                                                        let price = parseInt(p.price).toLocaleString('en-US');
                                                        let amount = (parseInt(p.price) * parseInt(p.quantity)).toLocaleString('en-US');
                                                        let date = p.date.split('T')[0];
                                                        let time = p.date.split('T')[1].slice(0, 8);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index}</td>
                                                                <td>{p.name}</td>
                                                                <td>{price}</td>
                                                                <td>{p.quantity}</td>
                                                                <td>{amount}</td>
                                                                <td>{time}</td>
                                                                <td>{date}</td>

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

export default AdminListOrder