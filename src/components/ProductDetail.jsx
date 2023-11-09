import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import { getUserIdFromCookie } from "./Header"
import Footer from "./Footer"
import { useNavigate, useParams } from "react-router-dom"
import './main.css'

const ProductDetail = () => {
    const [product, setProduct] = useState({
        id: 0,
        name: '',
        size: 0,
        price: 0,
        image: ''
    })
    const param = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const cookieArray = document.cookie.split(';');
        const userIdObject = cookieArray.filter(cookie => cookie.includes('userId'))[0];
        if (userIdObject) {
            const userId = userIdObject.split('=')[1];
            fetch('http://localhost:9999/user/' + userId)
                .then((result) => {
                    return result.json();
                })
                .then((result) => {
                    setUser(result);
                })
                .catch((err) => {
                    console.log('error', err);
                });
        }
    }, [])

    useEffect(() => {
        fetch(`http://localhost:9999/Product`)
            .then((res) => res.json())
            .then((result) => {
                const product = result.find(product => product.id.toString() === param.productId)
                setProduct(product);
            });
    }, []);

    function handleQuantity(status) {
        if (status === '-') {
            let a = quantity;
            if (a > 1) {
                a = a - 1;
                setQuantity(a)
            }
        }
        if (status === '+') {
            console.log('click');
            let a = quantity;
            if (a < 10) {
                a = a + 1;
                setQuantity(a)
            }
        }
    }

    function addToCart() {
        const productInCart = { ...product, quantity: quantity }
        let existedInCart = false;
        user.cart.map(item => {
            if (item.id === productInCart.id) {
                item.quantity += quantity;
                existedInCart = true;
            }
        })
        if (!existedInCart) {
            user.cart.push(productInCart);
        }

        const newUser = user;

        fetch(`http://localhost:9999/user/${newUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((result) => {
                alert("Add in Cart Successfully")
            }).catch((err) => {

            });
    }

    console.log(user.id);

    return (
        <>
            <Header />
            <div className="product-detail-container d-flex col-12 justify-content-center" style={{ margin: '80px 0' }}>
                <div className="col-10 row">
                    <div className="col-6">
                        <img src={product.image} alt="product" style={{ width: '100%' }} />
                    </div>
                    <div className="col-6">
                        <h2 style={{ margin: '10px 0' }}>{product.name}</h2>
                        <h3 style={{ color: 'red' }}>{parseInt(product.price).toLocaleString('en-US')} đ</h3>
                        <h3 style={{ color: '#2f3133' }}>Size: {product.size}</h3>


                        <div className="row col-6 d-flex my-5" style={{ fontSize: '16px' }}>
                            <button className="btn btn-warning" onClick={() => handleQuantity('-')}>-</button>
                            <div className="col-2" onChange={(e) => setQuantity(e.target.value)}> {quantity} </div>
                            <button className="btn btn-warning" onClick={() => handleQuantity('+')}>+</button>
                            <div className="col-12">*Quantity from 1 to 10</div>
                        </div>

                        <div className="row col-5 d-flex justify-content-between my-5">
                            {
                                user.id ? (
                                    <>
                                        <button className="btn btn-success" onClick={() => addToCart()}>Add to cart</button>
                                        <button className="btn btn-danger" onClick={() => navigate('/cart')}>View Cart</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-outline-success">Login First To Buy This Product</button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetail