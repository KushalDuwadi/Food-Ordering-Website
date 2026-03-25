import React  from 'react'
import{useContext,useState} from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios'


export const PlaceOrder = () => {
  const{getTotalCartAmount,token,food_list,cartItems} = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
    })


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = []
    food_list.map((item) =>
       
      {
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];

        orderItems.push(itemInfo);
      }

    }
    
  )
let orderData = {
  items:orderItems,
  amount:getTotalCartAmount()+2,
  address: data,
}
let response = await axios.post("http://localhost:4000/api/order/place", orderData,{headers: { Authorization: `Bearer ${token}` } });

if(response.data.success){
  const {sessionUrl} = response.data;
  window.location.replace(sessionUrl);

}
else{
  alert("Something went wrong while placing the order");} 
  }










  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required  type="text"placeholder='first name' name='firstName' value={data.firstName} onChange={onChangeHandler} />
          <input required  type="text"placeholder='last name' name='lastName' value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input required  type="email" placeholder='Email adddress'  name='email' value={data.email} onChange={onChangeHandler}/>
        <input required  type="text" placeholder='street'  name='street' value={data.street} onChange={onChangeHandler}/>
        <div className="multi-fields">
          <input required  type="text"placeholder='city'  name='city' value={data.city} onChange={onChangeHandler} />
          <input required type="text"placeholder='State'  name='state' value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input required type="text"placeholder='zip-code'   name='zipCode' value={data.zipCode} onChange={onChangeHandler}/>
          <input required  type="text"placeholder='country'  name='country' value={data.country} onChange={onChangeHandler} />
        </div>
        <input type="text"placeholder='Phone'   name='phone' value={data.phone} onChange={onChangeHandler}/>
      </div>
      <div className="place-order-right">
          <div className="cart-total">
    <h2>Cart Totals</h2>
    <div>
    <div className="cart-total-details">
      <p>Subtotal</p>
      <p>${getTotalCartAmount()}</p>
    </div>
    <div className="cart-total-details">
      <p>Delivery Fee</p>
      <p>${getTotalCartAmount()===0?0:getTotalCartAmount}</p>
    </div>
    <div className="cart-total-details">
      <p>Total</p>
      <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
    </div>

    </div>
    <button type = "submit">PROCEED TO Payment</button>
  </div>
      </div>
    </form>
  )
}

