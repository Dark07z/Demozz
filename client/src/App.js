import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "components/Home";
import LoginPage from "components/NikeAuthForm/pages/LoginPage";
import LookupPage from "components/NikeAuthForm/pages/LookupPage";
import SignupPage from "components/NikeAuthForm/pages/SignupPage";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Notification from "components/Home/Notification";
import TopHeader from "components/Home/TopHeader";
import ManProducts from "components/ManProducts";
import WomenProducts from "components/WomenProducts";
import KidsProducts from "components/KidsProducts";
import Description from "pages/description/Description";
import Cart from "pages/cart/Cart";
import Favourite from "pages/favourite/Favourite";
import CheckoutPage from "pages/payment/Checkout";
import PaymentReturn from "pages/payment/PaymentReturn";
import ThankYou from "pages/payment/ThankYou";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
              <LoginPage />
          }
        />
        <Route
          path="/lookup"
          element={
              <LookupPage />
          }
        />
        <Route
          path="/signup"
          element={
              <SignupPage />
          }
        />
        <Route
          path="/"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Home />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/men"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <ManProducts />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/men/description"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Description />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/women/description"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Description />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/kids/description"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Description />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Cart />
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/payment" element={<CheckoutPage />} />
        <Route path="/payment/return" element={<PaymentReturn />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route
          path="/favorites"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Favourite />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/favourites"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <Favourite />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/women"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <WomenProducts />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/kids"
          element={
            <>
              <TopHeader />
              <Navbar />
              <Notification />
              <div className="mx-10 min-h-[45vh]">
                <KidsProducts />
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
