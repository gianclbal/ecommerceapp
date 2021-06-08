import React, { useEffect, useState } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import RegisterNewUser from './containers/RegisterNewUser';
import MarketPlace from './containers/MarketPlace';
import ProfilePage from './containers/ProfilePage';
import CartPage from './containers/CartPage';
import Login from './containers/LoginPage';
import { useHistory } from "react-router-dom";
import { setListings } from './redux/actions/listingActions';
import { userLogOut, setUser, setUsers, setUserName, setPassword, setIsLoggedIn, setUserListing } from './redux/actions/userActions';
import axios from 'axios';
import CheckOutPage from './containers/CheckOutPage';
import AuctionPage from './containers/AuctionPage';
import ConfirmationPage from './containers/ConfirmationPage';
import { cartReset, setProducts } from './redux/actions/cartActions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import {
  Switch,
  Route,
  NavLink,
  Link
} from 'react-router-dom';


const App = ({ ws }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [user, setUser] = useState('');
  const user = useSelector(state => state.userReducer.user);
  const username = useSelector(state => state.userReducer.username);
  const password = useSelector(state => state.userReducer.password);
  const userListing = useSelector(state => state.userReducer.userListing);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const products = useSelector(state => state.cartReducer.products);
  const clientCount = useSelector(state => state.messageReducer.clientCount);
  

  // useEffect(() => {

  // }, [setProducts])

  const handleLogOut = () => {


    dispatch(userLogOut);
    dispatch(cartReset);
    history.push('/login');
  }

  console.log(products);
  // console.log(user);
  // console.log(username);
  // console.log(password);
  // console.log(userListing);

  return (
    <div>
      {isLoggedIn &&
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/market">ECommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/market">Market</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart <Badge bg="primary">{products.length}</Badge></Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text>
                Active users: <a>{clientCount}</a>
              </Navbar.Text>
              <Nav.Link as={Link} to="/logout" onClick={handleLogOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      }


      {/* 
      {isLoggedIn && <nav>
        <NavLink to="/market" activeClassName="active">
          Market
          </NavLink>
        <NavLink to="/profile" activeClassName="active">
          Profile
          </NavLink>
        <NavLink to="/cart" activeClassName="active">
          Cart
          </NavLink>
        <NavLink to="/logout" activeClassName="active" onClick={handleLogOut}>
          LogOut
          </NavLink>
      </nav>} */}
      <Switch>
        {!isLoggedIn && <Route exact path="/">
          <Login />
        </Route>}
        {!isLoggedIn && <Route exact path="/login">
          <Login />
        </Route>}
        {!isLoggedIn && <Route exact path="/signup">
          <RegisterNewUser />
        </Route>}
        {isLoggedIn && <Route exact path="/market">
          <MarketPlace ws={ws} />
        </Route>}
        {isLoggedIn && <Route path="/market">
          <MarketPlace />
        </Route>}
        {isLoggedIn && <Route path="/profile">
          <ProfilePage />
        </Route>}
        {isLoggedIn && <Route path="/cart">
          <CartPage />
        </Route>}
        {isLoggedIn && <Route path="/checkout">
          <CheckOutPage />
        </Route>}
        {!isLoggedIn && <Route path="/logout">
          <Login />
        </Route>}
        {isLoggedIn && <Route path="/orderconfirmed">
          <ConfirmationPage />
        </Route>}
        {isLoggedIn && <Route path="/auction">
          <AuctionPage userMode={"auction"} ws={ws} />
        </Route>}


      </Switch>
    </div>
  );
}


export default App;


// <div className="app">
//       <div className="nav-bar">
//         {isLoggedIn && (
//           <NavLink to="/">Home</NavLink>
//         )}
//         {!isLoggedIn && (
//           <NavLink to="/login">
//             <Login />
//           </NavLink>
//         )}
//       </div>
//       <Switch>
//         <Route path="/">
//           <MarketPlace />
//         </Route>
//         <Route path="/login">
//          <Login/>
//          </Route>
//         <Route path="/market">
//           <MarketPlace />
//         </Route>
//         <Route path="/profile">
//           <ProfilePage />
//         </Route>
//         <Route path="/cart">
//           <CartPage />
//         </Route>
//         <Route path="/logOut">
//           <LogOut />
//         </Route>
//       </Switch>
//     </div>

//ORIGINAL
// return (
//   <div>
//     <Provider store={store}>
//       <React.StrictMode>
//         <BrowserRouter>
//           {isLoggedIn && <nav>
//             <NavLink to="/market" activeClassName="active">
//               Market
//         </NavLink>
//             <NavLink to="/profile" activeClassName="active">
//               Profile
//         </NavLink>
//             <NavLink to="/cart" activeClassName="active">
//               Cart
//         </NavLink>
//             <NavLink to="/logOut" activeClassName="active">
//               LogOut
//         </NavLink>
//           </nav>}
//           <Switch>
//             {!isLoggedIn !== "SignUp" && <Route exact path="*">
//               <Login />
//             </Route>}
//             {!isLoggedIn === "SignUp" && <Route>
//               <div>
//                 <RegisterNewUser />
//               </div>
//             </Route>}
//             <Route exact path="/">
//               <MarketPlace />
//             </Route>
//             <Route path="/market">
//               <MarketPlace />
//             </Route>
//             <Route path="/profile">
//               <ProfilePage />
//             </Route>
//             <Route path="/cart">
//               <CartPage />
//             </Route>
//             <Route path="/logOut">
//               <LogOut />
//             </Route>
//           </Switch>
//         </BrowserRouter>
//       </React.StrictMode>
//     </Provider>
//   </div>
// );