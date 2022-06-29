import React from "react";

import Wrapper from "../../assets/wrappers/DashboardFormPage.js";
import { Alert, FormRow, FormRowSelect } from "../../components";
import { useStateValue } from "../../context/StateContext.js";

const addProduct = () => {
  const {
    isLoading,
    showMessage,
    displayAlert,
    isEditing,
    statusOptions,
    status,
    typeOptions,
    type,
    productName,
    productImage,
    productPrice,
    handleProductChange,
    clearValues,
    createProduct,
    editProduct
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useStateValue();

  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleProductChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !productImage || !productPrice) {
      displayAlert();
      return;
    }

    if(isEditing){
      editProduct();
      return;
    }

    createProduct();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>
        {showMessage && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="productName"
            value={productName}
            onChange={handleProductInput}
          />

          <FormRow
            type="text"
            name="productImage"
            value={productImage}
            onChange={handleProductInput}
          />

          <FormRow
            type="number"
            name="productPrice"
            value={productPrice}
            onChange={handleProductInput}
          />

          <FormRowSelect
            name="status"
            options={statusOptions}
            value={status}
            onChange={handleProductInput}
          />

          <FormRowSelect
            name="type"
            value={type}
            options={typeOptions}
            onChange={handleProductInput}
          />

          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" disabled={isLoading}>
              Submit
            </button>
            <button 
            type="button" 
            className="btn btn-block clear-btn"
              onClick={clearValues}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default addProduct;
