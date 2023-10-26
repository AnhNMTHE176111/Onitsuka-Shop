import { useEffect, useState } from "react"
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ListProduct = () => {
    const PRODUCT_PER_PAGE = 12;
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [pages, setPages] = useState([]); // 12 products per page
    const [currentPage, setCurrentPage] = useState(0);
    const [pagingProducts, setPagingProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:9999/product/")
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                handleSetPagingProducts(result, 1);
                setProducts(result);
                setCurrentProducts(result);
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }, []);

    useEffect(() => {
        handleSetPagingProducts(currentProducts, currentPage);
    }, [currentPage])

    const handleSetPagingProducts = (data, currentPage) => {
        setCurrentPage(currentPage);
        const end = data.length / PRODUCT_PER_PAGE + 1;
        let setpage = [];
        for (let index = 1; index < end; index++) {
            setpage = [...setpage, index];
        }
        setPages(setpage);
        currentPage--;
        const start = currentPage * PRODUCT_PER_PAGE;
        const end2 = currentPage * PRODUCT_PER_PAGE + PRODUCT_PER_PAGE;
        if (data.length > currentPage * PRODUCT_PER_PAGE) {
            setPagingProducts(data.slice(start, end2));
        }
        else {
            setPagingProducts(data.slice(end2, data.length));
        }
    }

    const handleFilterSize = (size) => {
        let listProduct = [...products];
        if (size) {
            listProduct = listProduct.filter(product => product.size.toString().includes(size.toString()));
        }
        setCurrentProducts(listProduct);
        resetFilterPrice();
        handleSetPagingProducts(listProduct, 1);
    }

    const handleFilterByPrice = (type) => {
        let listProduct = [...currentProducts];
        switch (type) {
            case 'decrease':
                listProduct = listProduct.sort((a, b) => a.price < b.price ? 1 : -1);
                break;
            case 'increase':
                listProduct = listProduct.sort((a, b) => a.price < b.price ? -1 : 1);
                break;
            default:
                listProduct = [...currentProducts];
                break;
        }
        handleSetPagingProducts(listProduct, 1);
    }

     const handleSearch = (searchValue) => {
        console.log(searchValue);
        let listProduct = [...products];
        if (searchValue) {
            listProduct = listProduct.filter((product) => {
                return product.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }
        handleSetPagingProducts(listProduct, 1);
        setCurrentProducts(listProduct);
    };

    const handleChangeCurrentPage = (status) => {
        if (status === 'pre') {
            currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
        }
        if (status === 'next') {
            currentPage < pages.length ? setCurrentPage(currentPage + 1) : setCurrentPage(pages.length);
        }
    }

    const resetFilterPrice = () => {
        handleFilterByPrice();
        const radioButtons = document.querySelectorAll('.filterPrice');
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
    }

    return (
        <>
            <Header onSearch={handleSearch} />
            <Banner />

            <div className="production col-12">
                <div className="production-title">
                    <div className="title justify-content-center">
                        <div className="bar col-3 col-sm-3 col-md-3 col-lg-3"></div>
                        <h2 className=" col-5 col-sm-3 col-md-4 col-lg-4 text-center">Special Product</h2>
                        <div className="bar col-3 col-sm-3 col-md-3 col-lg-3"></div>
                    </div>
                    <p className="text-center">Browse the production for more details.</p>
                </div>

                <div className="col-12 row fluid" style={{ display: 'flex' }}>
                    <div className="filter-options col-md-2 col-lg-2 col-sm-12">
                        <h2 style={{ textAlign: 'center' }}> Filter Options </h2>
                        <div className="price">
                            <h4 style={{ textAlign: 'center' }}>----- Price -----</h4>
                            <div style={{ marginLeft: '25px' }}>
                                <div>
                                    <input type="radio" className="filterPrice" name="filterPrice" onClick={() => handleFilterByPrice('decrease')} id="decrease" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="decrease">Price Highest to Lowest</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterPrice" name="filterPrice" onClick={() => handleFilterByPrice('increase')} id="increase" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="increase"> Price Lowest to Highest </label>
                                </div>
                                <div>
                                    <button className="btn btn-success" onClick={() => resetFilterPrice()}>Reset</button>
                                </div>
                            </div>
                        </div>
                        <div className="size">
                            <h4 style={{ textAlign: 'center' }}>----- Size -----</h4>
                            <div style={{ marginLeft: '25px' }}>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(36)} value={'size36'} id="size36" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size36">36 (225mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(37)} value={'size37'} id="size37" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size37">37 - 37.5 (230 - 235mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(38)} value={'size38'} id="size38" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size38">38 (240mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(39)} value={'size39'} id="size39" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size39">39 - 39.5 (245 - 250mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(40)} value={'size40'} id="size40" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size40">40 (252.5mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(41)} value={'size41'} id="size41" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size41">40.5 - 41.5 (255-260mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(42)} value={'size42'} id="size42" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size42">42 - 42.5 (265-270mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(43)} value={'size43'} id="size43" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size43">43.5 - 44 (275-280mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(44)} value={'size44'} id="size44" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size44">44.5 (282.5mm)</label>
                                </div>
                                <div>
                                    <input type="radio" className="filterSize" name="filterSize" onClick={() => handleFilterSize(45)} value={'size45'} id="size45" />
                                    <label style={{ marginLeft: '10px' }} htmlFor="size45">45 (285mm)</label>
                                </div>
                                <div>
                                    <button className="btn btn-primary" onClick={() => {
                                        handleFilterSize();
                                        const radioButtons = document.querySelectorAll('.filterSize');
                                        radioButtons.forEach(radioButton => {
                                            radioButton.checked = false;
                                        });
                                    }}> All Size </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-list col-md-9">
                        {
                            pagingProducts.map(product => {
                                const price = product.price.toLocaleString('en-US');
                                const linkProduct = product.name.toLowerCase().replace(/\s/g, '-');
                                return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/${product.id}`)}>
                                        <div className="card">
                                            <img className="card-img-top" src={product.image} alt="edr78" />
                                            <div className="card-body">
                                                <h5 className="card-title" style={product.name.length > 25 ? { fontSize: "18px" } : { fontSize: "20px" }} >{product.name}</h5>
                                                <p className="card-text">UNISEX SHOES - <span style={{ fontWeight: 'bolder', color: 'red' }}>Size: {product.size}</span></p>
                                                <p className="card-price"> {price} đ </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button className="page-link" onClick={() => handleChangeCurrentPage('pre')} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {
                            pages.map((page, index) => (
                                <li className="page-item" key={index}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(page)}
                                        style={page === currentPage ? { backgroundColor: '#4891FF', color: 'white' } : {}}
                                    >{page} </button>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            <button className="page-link" onClick={() => handleChangeCurrentPage('next')} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>

            </div>
            <Footer />
        </>
    )
}

export default ListProduct;