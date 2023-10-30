import { Col, Container, Row, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import multer from 'multer';
// import fs from 'fs'
import './main.css'

const EditProduct = () => {
    const navigate = useNavigate();
    const defaultProduct = {
        id: 0,
        name: '',
        size: 0,
        price: 0,
        image: ''
    }
    const ProductID = useParams().ProductId;
    const [Product, setProduct] = useState(defaultProduct);
    const [name, setName] = useState('');
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [file, setFile] = useState();
    const [previewImage, setPreviewImage] = useState(null);
    const [isChange, setIsChange] = useState(true);

    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                const currentProduct = result.find((r) => {
                    return r.id == ProductID;
                })
                setProduct(currentProduct);
                setName(currentProduct.name);
                setSize(currentProduct.size);
                setPrice(currentProduct.price);
                if (!currentProduct.image.startsWith('blob')) {
                    let StringSrcImage = 'http://localhost:3000' + currentProduct.image.slice(1, currentProduct.image.length);
                    setImage(StringSrcImage);
                }
                else {
                    setImage(currentProduct.image);
                }
                setPreviewImage('')
            });
    }, [isChange])

    const handleProduct = () => {
        if (name === "" ||
            price === "" ||
            size === "" ||
            image === "") {
            alert("Please enter complete information");
        }
        else if (size < 36 || size > 45) {
            alert("Size must be between 36 and 45");
        }
        else {
            let newproduct = {}
            if (file) {
                const url = URL.createObjectURL(file);
                document.getElementById('abcxyz').src = url.toString();

                newproduct = {
                    name: name,
                    price: price,
                    size: size,
                    image: url
                }
            }
            else {
                newproduct = {
                    name: name,
                    price: price,
                    size: size,
                    image: image
                }
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
        // navigate("/");
    }

    function handleResetProduct() {
        setIsChange(!isChange)
    }

    const previewProfileImage = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                // Set the previewImage state with the data URL of the selected image
                setPreviewImage(event.target.result);
            };

            reader.readAsDataURL(file);
        }
    };



    return (
        <div style={{ margin: '' }} className='col-12 justify-content-center d-flex'>
            <Container fluid className='col-8 my-5'>
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
                                            id="ID"
                                            defaultValue={ProductID}
                                            readOnly />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input required type="text" className="form-control"
                                            id="name"
                                            defaultValue={name}
                                            onChange={e => setName(e.target.value)} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input required type="text" className="form-control"
                                            id="price"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>

                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="size">Size:</label>
                                        <input required type="text" className="form-control"
                                            id="size"
                                            value={size}
                                            onChange={e => setSize(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={image} style={{ width: "100%" }} alt='' />
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="file" className="form-control" accept="image/gif, image/jpeg, image/png"
                                            id="image" onChange={(e) => previewProfileImage(e)} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img id='image-shoes' src={previewImage} alt="" style={{ width: "100%" }} />
                                    <img id='abcxyz' src="" alt="" style={{ display: 'none' }} />
                                </Col>

                            </Row>
                            <Row className='col-12 d-flex justify-content-start my-3'>
                                <Button
                                    className='btn btn-success  mx-2'
                                    onClick={() => navigate('/admin')}>Admin Home</Button>
                                <Button
                                    className='btn btn-primary mx-2 px-5'
                                    onClick={() => handleProduct()}>Save</Button>
                                <Button
                                    className='btn btn-dark mx-2'
                                    onClick={() => handleResetProduct()}>Reset</Button>
                            </Row>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditProduct;