import { useEffect, useState } from "react"

const SignIn = () => {
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState('');

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

    function handleSubmit(e) {
        console.log('click');
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        console.log('username: ' + username + ' password: ' + password);
        let user = users.filter(user => user.username === username && user.password === password)[0];
        if (user) {
            document.cookie = `userId=${user.id};expires=date`
            if (user.role === 'admin') {
                window.location.href = '/admin';
            }
            else {
                window.location.href = '/';
            }
        }
        else {
            setMsg('Wrong username or password');
        }
    }

    return (
        <div className="signin-container " >
            <div className="col-lg-6 left" style={{ backgroundImage: 'url(\'../images/background_img.jpg\')' }}>
            </div>

            <div className="container  col-sm-12 col-md-12 col-lg-6 row justify-content-center login-container right">
                <div className="title">
                    <img src="./images/logo.jpg" alt="" width="150px" />
                    <h1 style={{ textAlign: 'center' }}>Log in</h1>
                </div>
                <div className="social-login col-10">
                    <div className="col-12 apple"><i className="fa-brands fa-apple" style={{ color: '#ffffff' }}></i> Continue with Apple</div>
                    <div className="col-12 facebook"><i className="fa-brands fa-square-facebook" style={{ color: '#ffffff' }}></i> Continue with
                        Facebook</div>
                    <div className="col-12 google"><i className="fa-brands fa-google" style={{ color: '#b35f00' }}></i> Continue with Google</div>
                </div>

                <div className="bouder col-10" >
                    <div className="bar col-5"></div>
                    <h3 className="col-2" style={{ textAlign: 'center' }}>Or</h3>
                    <div className="bar col-5"></div>
                </div>

                <div className="form-login col-md-8 col-lg-8 col-sm-12 container">
                    <form action="" className="col-12 container flex justify-content-center" onSubmit={e => handleSubmit(e)}>

                        <div className="email Input d-flex justify-content-center col-12">
                            <input required className="col-8 " type="text" id="username" name="username" placeholder="Username..." />
                        </div>

                        <div className="password Input d-flex justify-content-center col-12">
                            <input required className="col-8 " type="password" id="password" name="password" placeholder="Password..." />
                        </div>

                        <div className="option col-12">
                            <div className="remember-me">
                                <input type="checkbox" />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <a href="forgotpassword">Forgot Password?</a>
                        </div>
                        <div className="col-12 row justify-content-center" style={{ color: 'red' }}>
                            {msg}
                        </div>
                        <div className="col-12 row justify-content-center">
                            <button className="btn-login col-10" type="submit">Log in</button>
                        </div>
                        <div className="sign-up col-sm-12">
                            <h4 style={{ textAlign: 'center' }}>Need an account? <a href="signup">Sign Up</a></h4>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn