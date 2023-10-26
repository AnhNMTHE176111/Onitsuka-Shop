import { Col, Container, Row, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';

const EditProduct = () => {
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
    const name = useRef();
    const price = useRef();
    const size = useRef();
    const image = useRef();
    const [img, setImg] = useState("");
    const [isChange, setIsChange] = useState(true);

    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                const currentProduct = result.find((r) => {
                    return r.id == ProductID;
                })
                setProduct(currentProduct);
                setImg(currentProduct.Images)
            });
    }, [])


    const updateImage = (e) => {
        const link = e.target.value;
        const links = link.split("\\");
        // const nameproduct = name.current.value.trim().split(" ");
        // const linkname = nameproduct.join("_");
    }

    const handleProduct = () => {
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
            const newproduct = {
                name: name.current.value,
                price: price.current.value,
                size: size.current.value,
                image: `../images/media/image${ProductID}.jpg`
            }
            fetch(`http://localhost:9999/Product/${ProductID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newproduct),
            });
            alert("Change Successfully")
            setIsChange(!isChange)
        }
        navigate("/");
    }

    return (
        <div style={{ margin: '50px' }}>
            <Container fluid>
                <Row>
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Edit Product</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="ID">ID:</label>
                                        <input type="text" className="form-control"
                                            id="ID" defaultValue={ProductID} readOnly />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name"
                                            defaultValue={Product.name} ref={name} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className="form-control"
                                            id="price" defaultValue={Product.price} ref={price} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="image">Size:</label>
                                        <input required type="number"
                                            className="form-control"
                                            id="size"
                                            defaultValue={Product.size}
                                            ref={size} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={img} style={{ width: "100%" }} alt='' />
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="file" className="form-control"
                                            id="image" ref={image} onChange={(e) => updateImage(e)} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={Product.image} alt="" style={{ width: "100%" }} />
                                </Col>

                            </Row>
                            <Button style={{
                                marginTop: "50px",
                                height: "70px", width: "150px",
                                fontSize: "30px", fontWeight: "600"
                            }}
                                onClick={() => handleProduct()}>Save</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditProduct;