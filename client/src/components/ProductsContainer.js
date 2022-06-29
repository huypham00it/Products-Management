import React, { useEffect } from "react";

import Loading from "./Loading";
import Product from "./Product";
import PageBtnContainer from "./PageBtnContainer";
import { useStateValue } from "../context/StateContext";
import Wrapper from "../assets/wrappers/ProductsContainer";

const ProductsContainer = () => {
  const {
    isLoading,
    totalProducts,
    products,
    getAllProducts,
    search,
    searchType,
    searchStatus,
    sort,
    numOfPages,
    page
  } = useStateValue();

  useEffect(() => {
    // eslint-disable-next-line 
    getAllProducts();
    // eslint-disable-next-line 
  }, [search, searchType, searchStatus, sort, page]);

  if (isLoading) {
    return <Loading />;
  }

  if (totalProducts === 0) {
    return <h5>No Products</h5>;
  }

  return (
    <Wrapper>
      <h3>
        {totalProducts} {totalProducts > 1 ? "Products" : "Product"} Found
      </h3>
      <div className="products">
        {products.map((prod) => (
          <Product key={prod._id} {...prod} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default ProductsContainer;
