// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState('');
//   const [food_list, setFoodList] = useState([]);

//   // Fetch food items from backend
//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/food/list");
//       if (response.status === 200) {
//         setFoodList(response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch food list:", error);
//     }
//   };

//   // Fetch cart data for a logged-in user
//   const fetchCart = async (userId) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/cart/get", {
//         userId,
//       });
//       if (response.status === 200) {
//         setCartItems(response.data.cartData || {});
//       }
//     } catch (error) {
//       console.error("Failed to fetch cart:", error);
//     }
//   };

//   // Add to cart function
//   const addToCart = async (itemId) => {
//   if (!token) {
//     alert("Please login to add items to the cart");
//     return;
//   }

//   try {
//     console.log("Sending request to add:", { userId: token, itemId });

//     const response = await axios.get("http://localhost:4000/api/cart/add", {
//       userId: token,
//       itemId,
//     });

//     if (response.status === 200) {
//       setCartItems(response.data.cartData);
//       console.log("Item added to cart:", response.data);
//     }
//   } catch (error) {
//     console.error("Add to cart failed:", error.response?.data || error.message);
//     alert("Failed to add item to cart");
//   }
// };

//   // Remove from cart function
//   const removeFromCart = async (itemId) => {
//     if (!token) {
//       alert("Please login to remove items from the cart");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:4000/api/cart/remove", {
//         userId: token,
//         itemId,
//       });

//       if (response.status === 200) {
//         setCartItems(response.data.cartData);
//         console.log("Item removed from cart successfully", response.data);
//       }
//     } catch (error) {
//       console.error("Error removing item from cart", error);
//       alert("Failed to remove item from cart");
//     }
//   };

//   // Total cart amount calculation
//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       if (cartItems[itemId] > 0) {
//         const item = food_list.find((item) => item._id === itemId);
//         if (item && typeof item.price === 'number') {
//           total += item.price * cartItems[itemId];
//         }
//       }
//     }
//     return total;
//   };

//   // On app load
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");

//     const loadData = async () => {
//       await fetchFoodList();
//       if (storedToken) {
//         setToken(storedToken);
//         await fetchCart(storedToken);
//       }
//     };

//     loadData();
//   }, []);

//   // Save token to localStorage
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
























import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Fetch food items from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");
      if (response.status === 200) {
        setFoodList(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // Fetch cart data for logged-in user
  const fetchCart = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:4000/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,   //this function sets the total increment decrement number of items in the same state  when the page is loaded or refreshed 
        },
      });
      if (response.status === 200) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add to cart function
  const addToCart = async (itemId) => {
    if (!token) {
      alert("Please login to add items to the cart");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart/add",
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCartItems(response.data.cartData);
        console.log("Item added to cart:", response.data);
      }
    } catch (error) {
      console.error("Add to cart failed:", error.response?.data || error.message);
      alert("Failed to add item to cart");
    }
  };

  // Remove from cart function
  const removeFromCart = async (itemId) => {
    if (!token) {
      alert("Please login to remove items from the cart");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart/remove",
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCartItems(response.data.cartData);
        console.log("Item removed from cart successfully", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart", error);
      alert("Failed to remove item from cart");
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find((item) => item._id === itemId);
        if (item && typeof item.price === "number") {
          total += item.price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  // On app load: fetch food list and cart (if logged in)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const loadData = async () => {
      await fetchFoodList();
      if (storedToken) {
        setToken(storedToken);
        await fetchCart();
      }
    };

    loadData();
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchCart(); // Fetch updated cart when token changes (user logs in/out)
    } else {
      localStorage.removeItem("token");
      setCartItems({}); // Clear cart if no token (logged out)
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
