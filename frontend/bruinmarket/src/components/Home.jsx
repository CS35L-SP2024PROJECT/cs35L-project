import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";

const Home = () => {
    const { data, isLoading, error, isError } = useGetProductsQuery();

    console.log('Loading:', isLoading);
    console.log('Error:', error);
    const products = data ? data.products : [];
    console.log('Products:', products);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Error fetching products');
        }
    }, [isError, error]);

    if (isLoading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <MetaData title={"Buy Best Products Online"} />
            <div className="row">
                <div className="col-12 col-sm-6 col-md-12">
                    <h1 id="products_heading" className="text-secondary">Latest Products</h1>

                    <section id="products" className="mt-5">
                        <div className="row">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductItem key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products found</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Home;
