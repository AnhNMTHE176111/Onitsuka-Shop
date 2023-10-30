import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import FileSaver, { saveAs } from 'file-saver';
import './main.css'


const CreateProduct = () => {
    const navigate = useNavigate();
    const defaultProduct = {
        id: 0,
        name: '',
        size: 0,
        price: 0,
        image: ''
    }
    const [listProduct, setListProduct] = useState([]);
    const [Product, setProduct] = useState(defaultProduct);
    const [productId, setProductId] = useState(0);
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
                setListProduct(result);
                setProductId(result.length + 1);
            });
    }, [isChange])

    const handleCreate = async () => {
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
            const data = [...listProduct];
            let product = data.filter(item => item.name.toLowerCase() === name.toLowerCase());
            if (product.length > 0) {
                alert("Product Existed");
                setIsChange(!isChange)
            }
            else {
                let newproduct = {}
                if (file) {
                    
                    const url = URL.createObjectURL(file);
                    document.getElementById('abcxyz').src = url.toString();

                    newproduct = {
                        name: name,
                        price: parseInt(price),
                        size: size,
                        image: url
                    }
                }
                else {
                    newproduct = {
                        name: name,
                        price: parseInt(price),
                        size: size,
                        image: image
                    }
                }
                await fetch("http://localhost:9999/product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newproduct),
                });
                setIsChange(!isChange)
                alert("Add new product Successfully")
            }
        }
    }

    const previewProfileImage = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0]; // Get the selected file
        setImage(file.name);
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
                            <h1 className="admin-title">Create Product</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
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
                                            onChange={e => setSize(parseInt(e.target.value))}
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
                            <Button style={{ marginTop: "10px", marginRight: '20px' }}
                                onClick={() => navigate('/admin')}
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