import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import './main.css'

const Profile = () => {
    const [user, setUser] = useState({});
    const [order, setOrder] = useState([]);
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
                setOrder(result.order);
            })
            .catch((err) => {
                console.log('error', err);
            });
    }, [])
    return (
        <>
            <Header />
            <div className="profile-container col-12 d-flex justify-content-center my-5">
                <div className="information-field col-8">
                    <h1>Profile</h1>
                    <Row>
                        <div className="col-6 form-group">
                            <label htmlFor="username">Username</label>
                            <input readOnly type="text" id="username" name="username" value={user.username} className="input form-control col-12" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="password">Password</label>
                            <input readOnly type="text" name="password" value={user.password} className="input form-control col-12" />
                        </div>
                    </Row>

                    <h1>Your Ordered</h1>
                    <div className="order-container container col-8 flex-column justify-content-center">
                        {
                            order.map((item, index) => {
                                return (
                                    <div className="order-item-container col-12 d-flex" style={{ margin: '20px' }} key={index}>
                                        <div className="col-3">
                                            <img src={item.image} alt="" style={{ width: '100%', borderRadius: '20px' }} />
                                        </div>
                                        <div className="col-5">
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
                                        <div className="col-4 row justify-content-around">
                                            <div className="">
                                                <h3>
                                                    {item.quantity}
                                                </h3>
                                            </div>
                                            <div className="">
                                                <h3>
                                                    {(item.quantity * item.price).toLocaleString('en-US')} đ
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile;