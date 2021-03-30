import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import store from "./store";

import ProductDetails from "./components/product/ProductDetails";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
