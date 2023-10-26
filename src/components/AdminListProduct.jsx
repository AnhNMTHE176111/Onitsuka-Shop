import { Button, Col, Container, FormControl, Row, Table } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import SideBar from './SideBar';

const AdminListProduct = () => {
    const [Product, setProduct] = useState([]);
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [paggingProducts, setPaggingProducts] = useState([]);
    const [pagging, setPagging] = useState([]);
    const [isChange, setIsChange] = useState(true)
    const search = useRef("");


    useEffect(() => {
        fetch("http://localhost:9999/product")
            .then((res) => res.json())
            .then((result) => {
                if (result.length >= 10) {
                    setPaggingProducts(result.slice(0, 10))
                }
                else {
                    setPaggingProducts(result.slice(0, result.length));
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
                setSearchedProduct(result);
                setProduct(result);
            });
    }, [isChange])
    useEffect(() => {
        if (searchedProduct.length >= 10) {
            setPaggingProducts(searchedProduct.slice(0, 10))
        }
        else {
            setPaggingProducts(searchedProduct.slice(0, searchedProduct.length));
        }
        let setpagging = [];
        let end;
        if (searchedProduct.length % 10 === 0) {
            end = searchedProduct.length / 10;
        } else {
            end = searchedProduct.length / 10 + 1;
        }
        for (let i = 1; i <= end; i++) {
            setpagging = [...setpagging, i]
        }
        setPagging(setpagging);
    }, [searchedProduct])

    const Pagging = (index) => {
        if (Product.length > index * 10) {
            setPaggingProducts(searchedProduct.slice((index - 1) * 10, index * 10))
        }
        else setPaggingProducts(searchedProduct.slice((index - 1) * 10, searchedProduct.length))
    }
    const SearchedList = (key) => {
        const searchedList = Product.filter((p) => {
            return p.name.toLowerCase().includes(key.current.value.toLowerCase());
        });
        setSearchedProduct(searchedList);
    }

    const deleteProduct = async (id) => {
        const confirm = window.confirm('Do you want to delete?')
        if (confirm) {
            fetch(`http://localHost:9999/product/${id}`, {
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
                            <h1 className="admin-title">Product Management</h1>
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
                                        <Link to="/createproduct">
                                            <Button style={{ width: '200px' }}
                                                className='btn-success'>
                                                Create a new product
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
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </thead>
                                            <tbody>
                                                {
                                                    paggingProducts.map((p) => {
                                                        const price = p.price.toLocaleString('en-US');
                                                        return (
                                                            <tr>
                                                                <td>{p.id}</td>
                                                                <td><Link to={`/chi-tiet-san-pham/${p.id}`}
                                                                    title='edit'>
                                                                    {p.name}</Link></td>
                                                                <td>{p.size}</td>
                                                                <td>{price} đ</td>
                                                                <td><Link
                                                                    onClick={() => deleteProduct(p.id)}>
                                                                    Delete</Link></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        <div className='pagging'>
                                            {
                                                pagging.map((p) => {
                                                    return (
                                                        <button className='btn btn-success'
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
export default AdminListProduct;