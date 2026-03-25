import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:4000"

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");

        if (response.status == 200) {
            console.log(response);


      setList(response.data); // ✅ use response.data directly not response.data.data because the API returns an array without a data property like { data: [] } it provides an array of food items like [{...}, {...}]
      toast.success("List fetched successfully");
    }

    } catch (error) {
      toast.error("Failed to fetch list");
      console.error("Fetch error:", error);
    }
  };
    const removeFood = (id) => async () => {
        console.log("clicked",id)
      
    
         
            const response = await axios.delete(`${url}/api/food/remove`, { data: { id: id } });
     
           


            await fetchList(); // Refresh the list after deletion
            if (response.status === 200) {
                toast.success("Food item deleted successfully");
            }
        }
       
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>


          {list.map((item) => (
            <div className="list-table-format" key={item._id}>
              <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button onClick={removeFood(item._id)}>Delete</button>
            </div>
          ))}


      </div>
    </div>
  );
}

export default List;
