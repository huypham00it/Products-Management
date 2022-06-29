import {AiOutlineFileSearch, AiOutlineAppstoreAdd, AiOutlineProfile, AiOutlineBarChart} from 'react-icons/ai';

const links = [
    {id: 1, text: 'Status', path: '/dashboard/', icon: <AiOutlineBarChart />},
    {id: 2, text: 'All Products', path: 'all-products', icon: <AiOutlineFileSearch />},
    {id: 3, text: 'Add Product', path: 'add-product', icon: <AiOutlineAppstoreAdd />},
    {id: 4, text: 'Profile', path: 'profile', icon: <AiOutlineProfile />},
]

export default links;