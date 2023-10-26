import { useEffect, useState } from "react";
import Footer from "./Footer"
import Header from "./Header"
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [isChange, setIsChange] = useState(true);
    const [chooses, setChooses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cookieArray = document.cookie.split(';');
        const userId = cookieArray.filter(cookie => cookie.includes('userId'))[0].split('=')[1];
        fetch('http://localhost:9999/user/' + userId)
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                setUser(result);
                setCart(result.cart);

            })
            .catch((err) => {
                console.log('error', err);
            });
    }, [isChange]);


    function handleQuantity(status, quantity, itemId) {
        if (status === '-') {
            let a = quantity;
            if (a > 1) {
                a = a - 1;
                cart.map(item => {
                    if (item.id === itemId) {
                        item.quantity = a;
                    }
                })
            }
        }
        if (status === '+') {
            console.log('click');
            let a = quantity;
            if (a < 10) {
                a = a + 1;
                cart.map(item => {
                    if (item.id === itemId) {
                        item.quantity = a;
                    }
                })
            }
        }
        user.cart = cart
        const newUser = user;
        updateCart(newUser);

    }

    function handleDelete(itemId) {
        let a = window.confirm('Are you sure you want to delete');
        if (a) {
            let newCart = cart.filter(item => item.id !== itemId)
            user.cart = newCart;
            const newUser = user;
            updateCart(newUser);
        }
    }

    function handleChoose(itemId, index) {
        const newCart = cart.filter(item => item.id === itemId)[0];
        let currentOrder = [...order];
        // remove cart
        if (currentOrder.filter(item => item.id === itemId)[0]) {
            currentOrder = currentOrder.filter(item => item.id !== itemId)
            setOrder(currentOrder);

            let listChoose = [...chooses];
            listChoose = listChoose.filter(item => item !== itemId)
            setChooses(listChoose)
        }
        // add new cart
        else {
            currentOrder.push(newCart);
            setOrder(currentOrder);

            let listChoose = [...chooses];
            listChoose.push(itemId)
            setChooses(listChoose)
        }
        setIsChange(!isChange);
    }

    function updateCart(newUser) {
        fetch(`http://localhost:9999/user/${newUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((result) => {
                setIsChange(!isChange);
            }).catch((err) => {

            });
    }

    function handleOrder() {
        let a = window.confirm('Are you sure you want to ORDER NOW');
        if (a) {
            let newCart = [...cart];
            order.map((item, index) => {
                newCart = newCart.filter(a => a.id !== item.id);
            })
            let newOrder = [...user.order, ...order];
            user.cart = newCart;
            user.order = newOrder;
            const newUser = user;
            updateCart(newUser);
            setCart([])
        }
    }

    const totalPrice = order.reduce((a, b) => a + b.price * b.quantity, 0);

    return (
        <>
            <Header />
            <div className="col-12 container d-flex my-5">
                <div className="cart-container container col-8  flex-column justify-content-center">
                    {
                        cart.map((item, index) => {
                            return (
                                <div className="cart-item-container col-9 d-flex" style={{ margin: '20px' }} key={index}>
                                    <div className="col-3">
                                        <img src={item.image} alt="" style={{ width: '100%', borderRadius: '20px' }} />
                                    </div>
                                    <div className="col-4">
                                        <h4>
                                            {item.name}
                                        </h4>
                                        <h4>
                                            Size: <span style={{ color: 'red' }}>
                                                {item.size}
                                            </span>
                                        </h4>
                                        <h4 style={{ color: 'red' }}>
                                            {item.price.toLocaleString('en-US')} đ
                                        </h4>
                                    </div>
                                    <div className="col-4">
                                        <div className="row col-12 d-flex my-5" style={{ fontSize: '16px' }}>
                                            <button className="btn btn-warning"
                                                onClick={() => handleQuantity('-', item.quantity, item.id)}>-</button>
                                            <div className="col-2"> {item.quantity} </div>
                                            <button className="btn btn-warning"
                                                onClick={() => handleQuantity('+', item.quantity, item.id)}>+</button>
                                            <div className="col-12">*Quantity from 1 to 10</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="row col-12 d-flex my-5">
                                            <button className="btn btn-outline-success mx-2" onClick={() => handleChoose(item.id, index)}>
                                                {chooses.filter(a => a === item.id)[0] ? 'Unchoose' : 'Choose'}
                                            </button>
                                            <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-4">
                    <h1 style={{ textAlign: 'center' }}>Order</h1>

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <td>Item</td>
                                <td>Name</td>
                                <td>Quantity</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toLocaleString('en-US')} đ</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td style={{ color: 'red', fontWeight: 'bolder' }}>{totalPrice.toLocaleString('en-US')} đ</td>
                            </tr>
                            {
                                totalPrice > 0 && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><button className="btn btn-warning" onClick={() => handleOrder()}>Order Now</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default Cart