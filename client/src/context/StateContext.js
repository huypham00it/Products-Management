import { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "./reducer";
import * as ActionTypes from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showMessage: false,
  alertText: "",
  alertType: "",
  user: JSON.parse(user) || null,
  token: token,
  location: location || "",
  showSidebar: false,
  isEditing: false,
  editProdId: "",
  statusOptions: ["Delivering", "Delivered", "Cancelled"],
  status: "Delivering",
  typeOptions: [
    "Clothes",
    "Footwear",
    "Jewelry",
    "Perfume",
    "Cosmetics",
    "Glasses",
    "Bags",
  ],
  type: "Clothes",
  productName: "",
  productImage: "",
  productPrice: 0,
  products: [],
  totalProducts: 0,
  page: 1,
  numOfPages: 1,
  productsStatus: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  image: ''
};

// prepares the data layer
export const StateContext = createContext();

// wrap app and provide the data layer
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: ActionTypes.DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ActionTypes.CLEAR_ALERT });
    }, 2500);
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: ActionTypes.SETUP_USER_BEGIN });
    try {
      const response = await axios.post("/api/auth/" + endPoint, currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: ActionTypes.SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });

      // add user to local storage
      addUserToLocalStorage(user, token, location);
    } catch (error) {
      dispatch({
        type: ActionTypes.SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const addUserToLocalStorage = (user, token, location) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const toggleSidebar = () => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: ActionTypes.LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (updatedUser) => {
    dispatch({ type: ActionTypes.UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/update-user", updatedUser);

      const { user, token, location } = data;
      dispatch({
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });

      // add user to local storage
      addUserToLocalStorage(user, token, location);
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: ActionTypes.UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const handleProductChange = (name, value) => {
    dispatch({
      type: ActionTypes.HANDLE_PRODUCT_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: ActionTypes.CLEAR_VALUES})
  }

  const createProduct = async () => {
    dispatch({type: ActionTypes.CREATE_PRODUCT_BEGIN});
    try {
        const {productName, productImage, productPrice, type, status} = state;
        await authFetch.post('/products', {
            name: productName,
            image: productImage,
            price: productPrice,
            status: status,
            type: type
        })

        dispatch({type: ActionTypes.CREATE_PRODUCT_SUCCESS});
        dispatch({type: ActionTypes.CLEAR_VALUES})
        
    } catch (error) {
        if(error.response.status === 401) return;
        dispatch({ type: ActionTypes.CREATE_PRODUCT_ERROR, payload:{msg: error.response.data.msg}})
    }
  }

  const getAllProducts = async () => {

    const {page, search, searchType, searchStatus, sort} = state;

    let url = `/products?page=${page}&productType=${searchType}&productStatus=${searchStatus}&sort=${sort}`;

    if(search){
      url += `&search=${search}`;
    }

    dispatch({ type: ActionTypes.GET_PRODUCTS_BEGIN});

    try {
      const {data} = await authFetch(url);

      dispatch({
        type: ActionTypes.GET_PRODUCTS_SUCCESS,
        payload: {
          products: data.products,
          totalProducts: data.totalProducts,
          numOfPages: data.numOfPages
        }
      })
    } catch (error) {
      logoutUser();
    }

    clearAlert();
  }

  const setEditProduct = (id) => {
    dispatch({ type: ActionTypes.SET_EDIT_PRODUCT, payload: {_id: id}})
  }

  const editProduct = async () => {
    dispatch({ type: ActionTypes.EDIT_PRODUCT_BEGIN});

    try {
      const {productName, productImage, productPrice, type, status, editProdId} = state;
      
      await authFetch.patch(`/products/${editProdId}`, {
        productName,
        productImage,
        productPrice,
        type,
        status
      })

      dispatch({ type: ActionTypes.EDIT_PRODUCT_SUCCESS});
      dispatch({ type: ActionTypes.CLEAR_VALUES})
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: ActionTypes.EDIT_PRODUCT_ERROR, payload: {msg: error.response.data.msg }})
    }

    clearAlert();
  }

  const deleteProduct = async (id) => {
    dispatch({ type: ActionTypes.DELETE_PRODUCT});

    try {
      await authFetch.delete(`/products/${id}`);
      getAllProducts();
    } catch (error) {
      logoutUser();
    }
  }

  const showStatus = async () => {
    dispatch({type: ActionTypes.SHOW_STATUS_BEGIN});

    try {
      const {data} = await authFetch('/products/status')

      dispatch({type: ActionTypes.SHOW_STATUS_SUCCESS, payload: {productsStatus: data.defaultStatus, monthlyApplications: data.monthlyApplications}})
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  }

  const clearFilters = () => {
    dispatch({ type: ActionTypes.CLEAR_FILTERS})
  }

  const changePage = (page) => {
    dispatch({ type: ActionTypes.CHANGE_PAGE, payload: {page}})
  }

  return (
    <StateContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleProductChange,
        clearValues,
        createProduct,
        getAllProducts,
        deleteProduct,
        setEditProduct,
        editProduct,
        showStatus,
        clearFilters,
        changePage
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// pull information from the data layer
export const useStateValue = () => useContext(StateContext);
