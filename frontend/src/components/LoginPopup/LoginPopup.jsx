// import React, { useState, useEffect } from 'react';
// import './LoginPopup.css';
// import { assets } from '../../assets/assets';
// import axios from 'axios';
// import { useContext } from 'react';
// import { StoreContext } from '../../context/StoreContext';

// export const LoginPopup = ({ setShowLogin }) => {
//   const {setToken} = useContext(StoreContext); // ✅ fixed context usage
//   const [currState, setCurrState] = useState("Login");
//   const [data, setData] = useState({ username: "", email: "", password: "" });
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ fixed name

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsLoggedIn(true);
//   }, []);

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const onLogin = async (event) => {
//     event.preventDefault();

//     let newUrl = "http://localhost:4000/";
//     newUrl += currState === "Login" ? "api/user/login" : "api/user/register";

//     try {
//       const response = await axios.post(newUrl, data);
//       if (response.status === 200 || response.status === 201) {
//         alert(currState === "Login" ? "Login Successful" : "Account Created");
//         localStorage.setItem("token", response.data.token);
//         setIsLoggedIn(true);
//         setShowLogin(false); // close the popup
//         setData({ username: "", email: "", password: "" });
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     alert("Logged out");
//   };

//   return (
//     <div className="login-popup">
//       {isLoggedIn ? (
//         <div className="login-popup-container">
//           <h2>You are logged in!</h2>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <form className="login-popup-container" onSubmit={onLogin}>
//           <div className="login-popup-title">
//             <h2>{currState}</h2>
//             <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
//           </div>
//           <div className="login-popup-inputs">
//             {currState === "Sign up" && (
//               <input
//                 type="text"
//                 name="username"
//                 onChange={onChangeHandler}
//                 value={data.username}
//                 placeholder="Username"
//                 required
//               />
//             )}
//             <input
//               type="email"
//               name="email"
//               onChange={onChangeHandler}
//               value={data.email}
//               placeholder="Email"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               onChange={onChangeHandler}
//               value={data.password}
//               placeholder="Password"
//               required
//             />
//           </div>
//           <button type="submit">{currState === "Sign up" ? "Create Account" : "Login"}</button>
//           <div className="login-popup-condition">
//             <input type="checkbox" required />
//             <p>I agree to the <span>Terms and Conditions</span></p>
//           </div>
//           {currState === "Login" ? (
//             <p>Don't have an account? <span onClick={() => setCurrState("Sign up")}>Click Here!!</span></p>
//           ) : (
//             <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };






import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

export const LoginPopup = ({ setShowLogin }) => {
  const { token, setToken  } = useContext(StoreContext); // ✅ Get from context
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
const onLogin = async (event) => {
  event.preventDefault();

  let newUrl = "http://localhost:4000/";
  newUrl += currState === "Login" ? "api/user/login" : "api/user/register";

  try {
    const response = await axios.post(newUrl, data);
    if (response.status === 200 || response.status === 201) {
      alert(currState === "Login" ? "Login Successful" : "Account Created");
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      setData({ username: "", email: "", password: "" });
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Something went wrong.");
    }
  }
};


  const handleLogout = () => {
    setToken(null); // ✅ Use context to clear token (and localStorage if implemented in context)
    alert("Logged out");
  };

  return (
    <div className="login-popup">
      {token ? (
        <div className="login-popup-container">
          <h2>You are logged in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="login-popup-container" onSubmit={onLogin}>
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Sign up" && (
              <input
                type="text"
                name="username"
                onChange={onChangeHandler}
                value={data.username}
                placeholder="Username"
                required
              />
            )}
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">{currState === "Sign up" ? "Create Account" : "Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>I agree to the <span>Terms and Conditions</span></p>
          </div>
          {currState === "Login" ? (
            <p>Don't have an account? <span onClick={() => setCurrState("Sign up")}>Click Here!!</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
          )}
        </form>
      )}
    </div>
  );
};
