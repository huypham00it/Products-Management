import * as ActionTypes from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_ALERT:
      return {
        ...state,
        showMessage: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };

    case ActionTypes.CLEAR_ALERT:
      return {
        ...state,
        showMessage: false,
        alertType: "",
        alertText: "",
      };

    case ActionTypes.SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        location: action.payload.location,
        showMessage: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };

    case ActionTypes.SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        location: "",
      };

    case ActionTypes.UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        location: action.payload.location,
        showMessage: true,
        alertType: "success",
        alertText: "Update Successfully!",
      };

    case ActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case ActionTypes.HANDLE_PRODUCT_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };

    case ActionTypes.CLEAR_VALUES:
      const initState = {
        isEditing: false,
        editProdId: "",
        status: "Delivering",
        type: "Clothes",
        productName: "",
        productImage: "",
        productPrice: 0,
      };

      return {
        ...state,
        ...initState,
      };

    case ActionTypes.CREATE_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        alertType: "success",
        alertText: "New Product Created!",
      };

    case ActionTypes.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    
    case ActionTypes.GET_PRODUCTS_BEGIN:
      return {
        ...state,
        isLoading: true
      }
      
    case ActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        numOfPages: action.payload.numOfPages
      }
    
    case ActionTypes.SET_EDIT_PRODUCT:
      const editProduct = state.products.find(product => product._id === action.payload._id)
      const {_id, name, image, price, type, status } = editProduct
      return {
        ...state,
        isEditing: true,
        editProdId: _id,
        productName: name,
        productImage: image,
        productPrice: price,
        type: type,
        status: status
      }

    case ActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypes.EDIT_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        alertType: "success",
        alertText: 'Updated Successfully!'
      }

    case ActionTypes.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        alertType: "danger",
        alertText: action.payload.msg
      }

    case ActionTypes.SHOW_STATUS_BEGIN: {
      return {
        ...state,
        isLoading: true,
        showMessage: false
      }
    }

    case ActionTypes.SHOW_STATUS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        productsStatus: action.payload.productsStatus,
        monthlyApplications: action.payload.monthlyApplications
      }
    }

    case ActionTypes.CLEAR_FILTERS: 
      return {
        ...state,
        search: '',
        searchType: 'all',
        searchStatus: 'all',
        sort: 'latest'
      }

    case ActionTypes.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      }

    default:
      return state;
  }
};

export default reducer;
