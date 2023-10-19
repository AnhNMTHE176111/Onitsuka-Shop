const HomePage = () => {
    return (
        <div className="production">
            <div className="production-title">
                <div className="title justify-content-center">
                    <div className="bar col-3 col-sm-3 col-md-3 col-lg-3"></div>
                    <h2 className=" col-5 col-sm-3 col-md-4 col-lg-4 text-center">Special Product</h2>
                    <div className="bar col-3 col-sm-3 col-md-3 col-lg-3"></div>
                </div>

                <p className="text-center">Browse the production for more details.</p>
            </div>

            <div className="product-list">

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/edr78.jpg" alt="edr78" />
                        <div className="card-body">
                            <h5 className="card-title">EDR 78</h5>
                            <p className="card-text">UNISEX SHOES</p>
                            <p className="card-price">$170.00</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/mexico66.jpg" alt="mexico66" />
                        <div className="card-body">
                            <h5 className="card-title">MEXICO 66</h5>
                            <p className="card-text">UNISEX SHOES</p>
                            <p className="card-price">$190.00</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/serrano.jpg" alt="serrano" />
                        <div className="card-body">
                            <h5 className="card-title">SERRANO</h5>
                            <p className="card-text">MEN SHOES</p>
                            <p className="card-price">$160.00</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/mexico66_black.jpg" alt="mexico66_black" />
                        <div className="card-body">
                            <h5 className="card-title">MEXICO 66 BLACK</h5>
                            <p className="card-text">UNISEX SHOES</p>
                            <p className="card-price">$185.00</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/mexico66_sd.jpg" alt="mexico66_sd" />
                        <div className="card-body">
                            <h5 className="card-title">MEXICO 66 SD</h5>
                            <p className="card-text">WOMEN SHOES</p>
                            <p className="card-price">$195.50</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/edr_78.jpg" alt="edr_78" />
                        <div className="card-body">
                            <h5 className="card-title">EDR 78 BLACK</h5>
                            <p className="card-text">UNISEX SHOES</p>
                            <p className="card-price">$170.00</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/mexico66vin.jpg" alt="mexico66vin" />
                        <div className="card-body">
                            <h5 className="card-title">MEXICO 66 VIN</h5>
                            <p className="card-text">UNISEX SHOES</p>
                            <p className="card-price">$176.55</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card">
                        <img className="card-img-top" src="./images/product_image/mexico_mix_runner.jpg" alt="mexico_mix_runner" />
                        <div className="card-body">
                            <h5 className="card-title">MEXICO MIX RUNNER</h5>
                            <p className="card-text">MEN SHOES</p>
                            <p className="card-price">$215.95</p>
                        </div>
                    </div>
                </div>

            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="previous" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="1">1</a></li>
                    <li className="page-item"><a className="page-link" href="2">2</a></li>
                    <li className="page-item"><a className="page-link" href="3">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="next" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default HomePage