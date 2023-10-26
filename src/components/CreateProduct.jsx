import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';

const CreateProduct = () => {
    const navigate = useNavigate();
    const defaultProduct = {
        id: 0,
        name: '',
        size: 0,
        price: 0,
        image: ''
    }
    const { ProductID } = useParams();
    const [Product, setProduct] = useState(defaultProduct);
    const [img, setImg] = useState("");
    const name = useRef();
    const category = useRef();
    const price = useRef();
    const size = useRef();
    const image = useRef();

    const [productId, setProductId] = useState(0);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                setProductId(result.length + 1);
            });
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                result.map((r) => {
                    if (r.id == ProductID) {
                        setProduct(r);
                    }
                })
            });
    }, [])

    const handleCreate = async () => {
        if (name.current.value === "" ||
            price.current.value === "" ||
            size.current.value === "" ||
            image.current.value === "") {
            alert("Please enter complete information");
        }
        else if (size.current.value < 36 || size.current.value > 45) {
            alert("Size must be between 36 and 45");
        }
        else {
            try {
                const link = image.current.value;
                const links = link.split("\\");
                // const nameproduct = name.current.value.trim().split(" ");
                // const linkname = nameproduct.join("_");
                const newproduct = {
                    name: name.current.value,
                    price: price.current.value,
                    size: size.current.value,
                    image: `../images/media/image${productId}.jpg`
                }

                const response = await fetch("http://localhost:9999/product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newproduct),
                });
            } catch (error) {
                console.error(error);
                // Handle the error, show an error message, or perform any necessary actions
            }
            navigate("/");
        }
    }
    const updateImage = (e) => {
        const link = e.target.value;
        const links = link.split("\\");
        const linkname = category.current.value;
        // const nameproduct = name.current.value.trim().split(" ");
        // const linkname = nameproduct.join("_");
        // console.log(links)
        setImg(`./images/media/image${productId}.jpg`)
    }


    return (
        <div style={{ margin: '50px' }}>
            <Container fluid>
                <Row>
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Create Product</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input required type="text"
                                            className="form-control"
                                            id="name"
                                            ref={name} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input required type="number"
                                            className="form-control"
                                            id="price"
                                            ref={price} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="image">Size:</label>
                                        <input required type="number"
                                            className="form-control"
                                            id="size"
                                            ref={size} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={img} style={{ width: "100%" }} alt='' />
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input required type="file"
                                            className="form-control"
                                            id="image" ref={image}
                                            onChange={(e) => updateImage(e)} />
                                    </div>
                                </Col>
                            </Row>
                            <Button style={{ marginTop: "10px", marginRight: '20px' }}
                                onClick={() => window.location.href = '/admin'}
                                className='btn btn-success'
                            >
                                Admin Home
                            </Button>
                            <Button style={{ marginTop: "10px" }}
                                onClick={() => handleCreate()}>
                                Create New Product
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default CreateProduct;