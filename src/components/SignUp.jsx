const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="col-lg-6 left" style={{backgroundImage: 'url(\'../images/background_img_register.jpg\')'}}>
            </div>

            <div className="container  col-sm-12 col-md-12 col-lg-6 row justify-content-center login-container right">
                <div className="title">
                    <img src="./images/logo.jpg" alt="" srcset="" width="150px" />
                    <h1 style={{textAlign: 'center'}}>Register</h1>
                </div>
                <div className="social-login col-10">
                    <div className="col-12 apple"><i className="fa-brands fa-apple" style={{color: '#ffffff'}}></i> Continue with Apple</div>
                    <div className="col-12 facebook"><i className="fa-brands fa-square-facebook" style={{color: '#ffffff'}}></i> Continue with
                        Facebook</div>
                    <div className="col-12 google"><i className="fa-brands fa-google" style={{color: '#b35f00'}}></i> Continue with Google</div>
                </div>

                <div className="bouder col-10" >
                    <div className="bar col-5"></div>
                    <h3 className="col-2" style={{textAlign: 'center'}}>or</h3>
                    <div className="bar col-5"></div>
                </div>

                <div className="form-login col-md-8 col-lg-8 col-sm-12 container">

                    <div className="email Input d-flex justify-content-center col-12">
                        <input className="col-8 " type="email" id="email" placeholder="Username..." />
                    </div>
                    <div className="email Input d-flex justify-content-center col-12">
                        <input className="col-8 " type="email" id="email" placeholder="Email..." />
                    </div>

                    <div className="password Input d-flex justify-content-center col-12">
                        <input className="col-8 " type="password" id="password" placeholder="Password..." />
                    </div>
                    <div className="password Input d-flex justify-content-center col-12">
                        <input className="col-8 " type="password" id="password" placeholder="Re Password..." />
                    </div>


                    <button className="btn-login col-10">Sign Up</button>
                    <div className="sign-up col-sm-12">
                        <h4 style={{textAlign: 'center'}}>Already have an account? <a href="signin.html">Sign In</a></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp