import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import menupng from "../image/menu.png";
import BackButton from "../component/return";
import QuantityInputWithButton from "../component/plus_minus-component";

function Order() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { userId, id, menu, dishId } = useParams();
  const [note, setNote] = useState("");

  const [item, setItem] = useState({
    shop_id: 0,
    name: "",
    price: 0,
    Calorie: 0,
    tag: [],
    description: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  });
  const [error, setError] = useState(null);
  console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/menus/singleitemdetails/${dishId}`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const responseData = await response.json(); // Assuming the response is JSON
        console.log('Response Data:', responseData.data);
  
        // Assuming responseData is an object with the desired structure
        setItem({
          shop_id: responseData.data.shop_id || 0,
          name: responseData.data.name || "",
          price: responseData.data.price || 0,
          Calorie: responseData.data.Calorie || 0,
          tag: responseData.data.tag || [],
          description: responseData.data.description || "",
          image: responseData.data.image || menupng,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };
  
    fetchData();
  }, [dishId]);
  
  const handleNoteChange = (event) => {
    // Update the note value in the state
    setNote(event.target.value);
  };

  // let item = {
  //   shop_id: 1,
  //   name: "牛肉麵",
  //   price: 100,
  //   Calorie: 500,
  //   tag: ["牛肉", "湯麵"],
  //   description: "半筋半肉，保證一次成主顧",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  // };
  const formData = {
    user_id: userId,
    shop_id: id,
    menu_id: menu,
    name: item.name,
    price: item.price,
    quantity: quantity,
    note: note,
  };

  const handleClick = async (shopId) => {

      try {
        const response = await fetch('http://localhost:3000/shopping/add/item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Data posted successfully');
          console.log(formData);
        } else {
          console.error(`Error: ${response.status}, ${await response.text()}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }

    console.log("Quantity:", quantity);
    setNote("");
    navigate(`/${userId}/restaurant/${shopId}/shop`);
    //傳入DB
  };

  useEffect(() => {
    console.log("Quantity updated:", quantity);
  }, [quantity]);

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <img
          // src={menupng}
          src={item.image}
          alt="menu"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <div
          style={{
            borderRight: "2px solid gray",
            borderLeft: "2px solid gray",
            borderTop: "2px solid gray",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <BackButton />
          <div style={{ paddingLeft: "20px", paddingTop: "70px" }}>
            <div>
              <div style={{ display: "inline" }}>
                <span style={{ fontSize: "30px" }}>
                  <strong>{item.name}</strong>
                </span>
                <span style={{ marginLeft: "90px" }}> </span>
                {item.tag.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      display: "inline-block",
                      margin: "2px",
                      padding: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#D3D3D3",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <span
                style={{
                  display: "inline-block",
                  margin: "2px",
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#D3D3D3",
                }}
              >
                {item.Calorie} 大卡
              </span>
            </div>
            <p>$ {item.price}</p>
            <p>{item.description}</p>
          </div>
          <p style={{ paddingLeft: "20px" }}>
            <strong>新增備註</strong>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className="rounded"
              placeholder="備註"
              type="text"
              value={note} // Set the value of the input from state
              onChange={handleNoteChange} // Handle changes to the input
              style={{
                width: "90%",
                height: "100px",
                fontSize: "16px",
                backgroundColor: "#D3D3D3",
              }}
            />
          </div>
          <p></p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QuantityInputWithButton onQuantityChange={setQuantity} />
            <button
              id="add_cart_btn"
              className="rounded"
              onClick={() => handleClick(item.shop_id)}
              style={{
                width: "120px",
                marginLeft: "8px",
                border: "none",
                backgroundColor: "#F4B63D",
              }}
            >
              <strong>加入購物車</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
