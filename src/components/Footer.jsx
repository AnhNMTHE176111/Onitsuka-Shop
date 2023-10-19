const Footer = () => {
    return (
        <footer className="bg-dark col-lg-12 col-md-12 col-sm-12 col-12 justify-content-center " style={{display: 'flex'}}>
            <div className="bg-dark col-lg-5 col-md-12 col-sm-12 connect-with-us">
                <div className="footer">
                    <div className="footer_header">
                        <p>CONNECT WITH US</p>
                    </div>
                    <div className="footer_social-list">
                        <ul>
                            <li><i className="fa-brands fa-facebook-f"></i></li>
                            <li><i className="fa-brands fa-instagram"></i></li>
                            <li><i className="fa-brands fa-twitter"></i></li>
                            <li><i className="fa-brands fa-youtube"></i></li>
                            <li><i className="fa-brands fa-linkedin-in"></i></li>
                        </ul>
                    </div>
                    <div className="footer_header">
                        <p>SIGN UP FOR OUR NEWSLETTER</p>
                    </div>
                    <p className="footer_copy">Be the first to hear about new products, exclusive evens and online offers</p>
                    <button>SIGN UP FOR EMAILS</button>
                </div>
            </div>
            <div className="bg-dark col-lg-2 col-md-12 col-sm-12 customer-service">
                <p className="title">CUSTOMER SERVICE</p>
                <ul className="list-item-footer">
                    <li>Track Your Order</li>
                    <li>Contact Us</li>
                    <li>Shipping</li>
                    <li>Returns</li>
                    <li>Size & Fit Guide</li>
                    <li>FAQs</li>
                    <li>Store Locator</li>
                </ul>
            </div>
            <div className="bg-dark col-lg-2 col-md-12 col-sm-12 corporate-info">
                <p className="title">COPORATE INFO</p>
                <ul className="list-item-footer">
                    <li>About Onitsuka Tiger</li>
                    <li>Tiger Tales</li>
                    <li>Privacy Policy</li>
                    <li>Terms and OCnditions</li>
                    <li>Terms of Use</li>
                    <li>Terms of Sale</li>
                </ul>
            </div>
            <div className="bg-dark col-lg-2 col-md-12 col-sm-12 one-asic">
                <p className="title">OneASICS</p>
                <ul className="list-item-footer">
                    <li>Join for Free</li>
                    <li>Sign In</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;