import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Home, Error, Register, ProtectedRoute } from './pages';
import { AllProduct, AddProduct, Profile, SharedLayout, Status} from './pages/dashboard'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
              }>
              <Route index element={<Status />} />
              <Route path="profile" element={<Profile />} />
              <Route path="all-products" element={<AllProduct />} />
              <Route path="add-product" element={<AddProduct />} />
            </Route>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
