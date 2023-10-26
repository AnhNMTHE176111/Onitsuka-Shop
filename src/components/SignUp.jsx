import { useEffect, useState } from "react";

const SignUp = () => {
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState({
        text: '',
        status: false
    });

    useEffect(() => {
        fetch('http://localhost:9999/user')
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                setUsers([...result]);
            })
            .catch((err) => {

            });
    }, [])


    async function handleSubmit(e) {
        console.log('click');
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let repassword = document.getElementById('repassword').value;
        if (repassword !== password) {
            setMsg({
                text: 'Password mismatch',
                status: false
            })
        }
        else {
            let user = users.filter(user => user.username === username && user.password === password)[0];
            if (user) {
                setMsg({
                    text: 'User existed',
                    status: false
                })
            }
            else {
                try {
                    const newUser = {
                        username: username,
                        role: 'customer',
                        password: password,
                        cart: []
                    }
                    fetch('http://localhost:9999/user', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser)
                    })
                        .then((result) => {
                            setMsg({
                                text: 'Create New User Successfully',
                                status: true
                            });
                        }).catch((err) => {
                            console.log('error', err);
                        });


                } catch (error) {
                    setMsg({
                        text: 'Something error',
                        status: false
                    });
                    console.log('error', error);
                }

            }
        }
    }
    return (
        <div className="signup-container">
            <div className="col-lg-6 left" style={{ backgroundImage: 'url(\'../images/background_img_register.jpg\')' }}>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6 justify-content-center login-container right">
                <div className="title">
                    <img src="./images/logo.jpg" alt="" width="150px" />
                    <h1 style={{ textAlign: 'center' }}>Register</h1>
                </div>
                <div className="social-login col-10">
                    <div className="col-12 apple"><i className="fa-brands fa-apple" style={{ color: '#ffffff' }}></i> Continue with Apple</div>
                    <div className="col-12 facebook"><i className="fa-brands fa-square-facebook" style={{ color: '#ffffff' }}></i> Continue with
                        Facebook</div>
                    <div className="col-12 google"><i className="fa-brands fa-google" style={{ color: '#b35f00' }}></i> Continue with Google</div>
                </div>

                <div className="bouder col-10" >
                    <div className="bar col-5"></div>
                    <h3 className="col-2" style={{ textAlign: 'center' }}>or</h3>
                    <div className="bar col-5"></div>
                </div>

                <div className="form-login col-md-8 col-lg-8 col-sm-12 container">
                    <form action="" className="col-12 container flex justify-content-center" onSubmit={e => handleSubmit(e)}>

                        <div className="email Input d-flex justify-content-center col-12">
                            <input required className="col-8 " type="text" id="username" placeholder="Username..." />
                        </div>

                        <div className="password Input d-flex justify-content-center col-12">
                            <input required className="col-8 " type="password" id="password" placeholder="Password..." />
                        </div>
                        <div className="password Input d-flex justify-content-center col-12">
                            <input required className="col-8 " type="password" id="repassword" placeholder="Re Password..." />
                        </div>

                        <div className="col-12 row justify-content-center" style={msg.status ? { color: 'green' } : { color: 'red' }}>
                            {msg.text}
                        </div>
                        <div className="col-12 row justify-content-center">
                            <button className="btn-login col-10" type="submit">Sign Up</button>
                        </div>
                        <div className="sign-up col-sm-12">
                            <h4 style={{ textAlign: 'center' }}>Already have an account? <a href="signin">Sign In</a></h4>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default SignUp