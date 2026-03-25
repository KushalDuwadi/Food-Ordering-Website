// // we can alo find active class using use state 


//       // const [menu , setMenu] = useState("Home")


//       // <ul className='navbar-menu'>
//       //   <li  onClick={()=>setMenu("Home")}   className= {menu==="Home"?"active":""}>Home</li>
//       //   <li  onClick={()=>setMenu("Menu")}  className={menu==="Menu"?"active":""}>Menu</li>
//       //   <li  onClick={()=>setMenu("Mobile-app")}   className={menu==="Mobile-app"?"active":""}>Mobile-app</li>
//       //   <li  onClick={()=>setMenu("Contact-us")}   className={menu==="Contact-us"?"active":""}>Contact-us</li>
//       // </ul>





// import React, { useContext } from 'react';
// import './Navbar.css';
// import { assets } from "../../assets/assets";
// import { NavLink } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';


// export const Navbar = ({ setShowLogin,scrollToFooter  }) => {
//   const{getTotalCartAmount,token,setToken} = useContext(StoreContext)
//   const handleLogout = () => {
//     setToken("");
//     localStorage.removeItem("token");
//     alert("Logged out successfully"); 
//   }


//   return (
//     <div className='navbar'>
//       <NavLink to='/'><img src={assets.logo} alt="" className='logo' /></NavLink>

//       <ul className='navbar-menu'>
//         <NavLink to='/'><li className='list'>Home</li></NavLink>
//         <NavLink to='/menu'><li className='list'>Menu</li></NavLink>
//         <NavLink to='/mobile-app'><li className='list'>Mobile-app</li></NavLink>
//         {/* Instead of NavLink for Contact, use a normal <li> and scroll */}
//         <li className='list' onClick={scrollToFooter} style={{ cursor: 'pointer' }}>Contact-us</li>
//       </ul>

//       <div className='navbar-right'>
//         <img className="search-icon" src={assets.search_icon} alt="" />
//         <div className='navbar-search-icon'>
//           <NavLink to="/cart"><img src={assets.basket_icon} alt="" /></NavLink>
//           <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//         </div>
//         {!token?
//         <button className='navbar-button' onClick={() => setShowLogin(true)}>Sign in</button>
//         :<div className='navbar-profile'>
//           <img src={assets.profile_icon} alt="" />
          
//           <ul className='nav-profile-dropdown'>
//             <li><img src={assets.bag_icon} alt= ""/><p>Orders</p></li>
//             <hr />
//             <li ><img  src={assets.logout_icon} alt="" /><p onClick={handleLogout}>LogOut</p></li>
//           </ul>
//         </div>}
//       </div>
//     </div>
//   );
// };



import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from "../../assets/assets";
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ setShowLogin, scrollToFooter, scrollToMenu }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    alert("Logged out successfully");
    setShowDropdown(false);
    navigate('/'); 
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className='navbar'>
      <NavLink to='/'><img src={assets.logo} alt="" className='logo' /></NavLink>

      <ul className='navbar-menu'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li onClick={scrollToMenu} style={{ cursor: 'pointer' }}>Menu</li>
        <li><NavLink to='/mobile-app'>Mobile-app</NavLink></li>
        <li onClick={scrollToFooter} style={{ cursor: 'pointer' }}>Contact-us</li>
      </ul>

      <div className='navbar-right'>
        <img className="search-icon" src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <NavLink to="/cart"><img src={assets.basket_icon} alt="" /></NavLink>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button className='navbar-button' onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img
              src={assets.profile_icon}
              alt=""
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <ul className='nav-profile-dropdown'>
                <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
