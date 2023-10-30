import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, FormControl, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { Chart } from 'chart.js/auto'

const AdminStatistic = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/product")
            .then((res) => res.json())
            .then((result) => { 
                setProducts(result)
            })

        fetch("http://localhost:9999/user")
            .then((res) => res.json())
            .then((result) => {
                let listOrder = [];
                result.map(item => {
                    if (item.order) {
                        listOrder = [...listOrder, ...item.order];
                    }
                })
                let amount = listOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
                setAmount(amount);
                setOrders(listOrder);
                setUsers(result);

                console.log(listOrder);

                // Chart //////////////////////////////////////////////////////////////////

                const ctx = document.getElementById('myChart');
                const existingChart = Chart.getChart('myChart');

                // Destroy the existing chart, if it's found
                if (existingChart) {
                    existingChart.destroy();
                }

                const userCountByDate = {};

                listOrder.forEach(user => {
                    const date = user.date;
                    const week = date.slice(0, 10);
                    if (!userCountByDate[week]) {
                        userCountByDate[week] = 0;
                    }
                    userCountByDate[week] += user.price * user.quantity;
                });

                const labels = Object.keys(userCountByDate).sort();
                const data = labels.map(week => userCountByDate[week]);

                let myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of Orders',
                            data: data,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Total Money',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                        }
                    }
                });
            })


    }, [])


    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "20px" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Statistics</h1>
                        </div>
                        <div className='admin-content'>
                            <Container>
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col md={2} onClick={() => navigate('/adminusers')} className="bg-success" style={{ textAlign: 'center', cursor: 'pointer', marginLeft: '30px', borderRadius: '10px', padding: '10px 0', color: 'white' }}>
                                        <h3>
                                            # Users: {users.length}
                                        </h3>
                                    </Col>
                                    <Col md={2} onClick={() => navigate('/adminorders')} className="bg-primary" style={{ textAlign: 'center', cursor: 'pointer', marginLeft: '30px', borderRadius: '10px', padding: '10px 0', color: 'white' }}>
                                        <h3>
                                            # Orders: {orders.length}
                                        </h3>
                                    </Col>
                                    <Col md={3} onClick={() => navigate('/adminorders')} className="bg-warning" style={{ textAlign: 'center', cursor: 'pointer', marginLeft: '30px', borderRadius: '10px', padding: '10px 0', color: 'white' }}>
                                        <h3>
                                            Total Amount: {amount.toLocaleString('en-Us')} đ
                                        </h3>
                                    </Col>
                                    <Col md={2} onClick={() => navigate('/productmanagement')} className="bg-info" style={{ textAlign: 'center', cursor: 'pointer', marginLeft: '30px', borderRadius: '10px', padding: '10px 0', color: 'white' }}>
                                        <h3>
                                            # Product: {products.length}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} style={{ marginTop: '30px' }}>
                                        <div>
                                            <canvas id="myChart"></canvas>
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

export default AdminStatistic