import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import OrderSummary from './pages/OrderSummary';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Product';

function App() {
  return (
    <>
      <Router>
        <div className="App bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/signin" element={<Layout showFooter={false}><SignIn /></Layout>} />
            <Route path="/signup" element={<Layout showFooter={false}><SignUp /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/order-summary" element={<Layout><OrderSummary /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/product" element={<Layout><Product /></Layout>} />
            <Route path="/payment" element={<Layout showFooter={false}><Payment /></Layout>} />
            {/* Add additional routes here */}
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
      </Router>
    </>
  )
}

export default App
