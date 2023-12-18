import React, { useState, useEffect, useId } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../component/return";
import Counter from "../component/plus_minus";
import defaultImage from "../image/defaultMenu.png";
import menupng from "../image/defaultImage.jpg";

function Shop() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const { userId } = useParams();
  const { id } = useParams();
  const [note, setNote] = useState("");
  
const [item, setItem] = useState([]);
  const [error, setError] = useState(null);
  console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/shopping/cartinfo/user/${userId}/shop/${id}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json(); 
        console.log("Response Data:", responseData);

        // Create the desired structure for the item state
        setItem(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [userId, id]);

  // let item = {
  //   shop_id: 1,
  //   restaurant: "麥當勞",
  //   total: 300,
  //   items: {
  //     1: {
  //       name: "牛肉麵",
  //       price: 100,
  //       quantity: 1,
  //       image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  //     },
  //     2: {
  //       name: "牛肉麵2",
  //       price: 100,
  //       quantity: 2,
  //       image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  //     },
  //   },
  // };

  const handleCountChange = (itemId, newCount) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: newCount,
    }));
  };

  const handleNoteChange = (event) => {
    // Update the note value in the state
    setNote(event.target.value);
  };

  let subtotals = [];
  let total = 0;
  // Calculate subtotal for each item
  if (item && item.items) {
    subtotals = Object.keys(item.items).map((itemId) => {
      const currentItem = item.items[itemId];
      const count =
        counts[itemId] !== undefined ? counts[itemId] : currentItem.quantity; // Use 0 if count is not set
      return count * currentItem.price; 
    });
  
    total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
  }

  const handleClick = (shop_id) => {
    navigate(`/${userId}/restaurant/${shop_id}`);
  };

  const handleClick2 = async () => {
    const data = {
      user_id: userId,
      shop_id: id,
      items: Object.keys(item.items).reduce((acc, itemId) => {
        // Move the declaration of currentItem outside of the reduce function
        const currentItem = item.items[itemId];
        
        const count =
          counts[itemId] !== undefined ? counts[itemId] : currentItem.quantity; // Use 0 if count is not set
        acc[itemId] = {
          name: currentItem.name,
          price: currentItem.price,
          quantity: count,
          image: currentItem.image,
        };
        return acc;
      }, {}),
      addition: note,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/shopping/update/items/note",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data posted successfully");
      } else {
        console.error(`Error: ${response.status}, ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    navigate(`/${userId}/restaurant/${id}/checkout`);
  };

  
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <img
          src={menupng}
          alt="menu"
          style={{ width: "100%", height: "10%", objectFit: "cover" }}
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
          <h2
            style={{ marginTop: "50px", marginLeft: "20px", fontSize: "40px" }}
          >
            <strong>{item.restaurant}</strong>
          </h2>
          {item &&
            item.items &&
            Object.keys(item.items).map((itemId) => {
              const currentItem = item.items[itemId];
              return (
                <div key={itemId} style={{ paddingLeft: "20px" }}>
                  <span style={{ fontSize: "25px" }}>
                    <strong>{currentItem.name}</strong>
                  </span>
                  <span style={{ marginLeft:"170px" }}>
                    {" "}
                    <img
                      src={currentItem.image || defaultImage}
                      style={{ width: "25%" }}
                      alt="圖片"
                    />{" "}
                  </span>
                  <p></p>
                  <Counter
                    initialValue={parseInt(currentItem.quantity, 10)}
                    onCountChange={(newCount) =>
                      handleCountChange(itemId, newCount)
                    }
                  />
                  <p style={{ marginLeft: "300px" }}>
                    ${" "}
                    {counts[itemId] !== undefined
                      ? currentItem.price * counts[itemId]
                      : currentItem.price * currentItem.quantity}
                  </p>
                  <p style={{ borderBottom: "2px solid gray" }}></p>
                  {console.log(counts[itemId])}
                </div>
              );
            })}

          <strong>
            <p style={{ marginLeft: "20px" }}>
              小計<span style={{ marginLeft: "280px" }}>{total}</span>
            </p>
          </strong>
          <p style={{ paddingLeft: "20px", fontSize: "1.2em" }}>
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
                border: "none",
                width: "90%",
                height: "100px",
                fontSize: "16px",
                backgroundColor: "#D3D3D3",
              }}
            />
          </div>
          <p></p>
          <button
            id="continue_btn"
            className="rounded"
            onClick={() => handleClick(item.shop_id)}
            style={{
              border: "none",
              height: "30px",
              width: "90%",
              marginLeft: "20px",
              backgroundColor: "#F4B63D",
            }}
          >
            <strong>繼續點餐</strong>
          </button>
          <p></p>
          <button
            id="checkout_btn"
            className="rounded"
            onClick={handleClick2}
            style={{
              border: "none",
              height: "30px",
              width: "90%",
              marginLeft: "20px",
              backgroundColor: "#F4B63D",
            }}
          >
            <strong>前往結帳</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shop;
