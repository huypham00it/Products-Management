import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import Wrapper  from '../assets/wrappers/Product';
import {useStateValue} from '../context/StateContext';
import ProductInfo from './ProductInfo';
import {BiCategory} from 'react-icons/bi';
import {IoIosCreate} from 'react-icons/io';

const Product = ({name, image, type, status, createdAt, _id, price}) => {
    const {setEditProduct, deleteProduct} = useStateValue();

    let date = moment(createdAt);
    date = date.format('MMM Do, YYYY');

  return (
    <Wrapper>
        <header>
            <div className="main-icon">
                <img src={image} alt="productImage" />
            </div>
            <div className="info">
                <h5>{name}</h5>
                <p>{price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>
        </header>
        <div className="content">
            <div className="content-center">
                <ProductInfo icon={<BiCategory />} text={type} />
                <ProductInfo icon={<IoIosCreate />} text={date} />
                <div className={"status "+status}>{status}</div>
            </div>
            <footer>
                <div className="actions">
                    <Link
                        to="/dashboard/add-product"
                        className="btn btn-block edit-btn"
                        onClick={() => setEditProduct(_id)}
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-block delete-btn"
                        onClick={() => deleteProduct(_id)}
                    >
                        Delete
                    </button>
                </div>
            </footer>
        </div>
    </Wrapper>
  )
}

export default Product