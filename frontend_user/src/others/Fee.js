import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../component/return";
import image from "../image/fee.png";
import HomeIcon from "@mui/icons-material/Home";

let HistoryItem = ({ name, price, time }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: "2px solid gray",
      marginBottom: "10px",
      paddingBottom: "10px",
    }}
  >
    <HomeIcon style={{ width: "50px" }} />
    <div style={{ marginLeft: "10px", marginTop: "20px" }}>
      <p>
        <strong>{name}</strong>
      </p>
      <p style={{ marginTop: "-15px" }}>
        <strong>
          {price} | {time}
        </strong>
      </p>
    </div>
  </div>
);

function Fee() {
  const { userId } = useParams();
  const [fee_information, setFee] = useState({});
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  console.log(error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/consumers/${userId}/report?year=${selectedYear}&month=${selectedMonth}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        setFee(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };
    fetchData();
  }, [userId, selectedYear, selectedMonth]);

  // let fee_information = {
  //   accumulate_fee: 2500,
  //   time: "2023年10月",
  //   history: {
  //     1: {
  //       name: "麥當勞",
  //       price: 100, //這邊是總價格喔~ price*quantity
  //       time: "10月30號",
  //     },
  //     2: {
  //       name: "麥當勞 2",
  //       price: 200,
  //       time: "10月30號",
  //     },
  //   },
  // };

  return (
    <div>
      <div
        style={{
          height: "70px",
          background: "#35A996",
          borderRadius: "0px 0px 30px 30px",
        }}
      >
        <BackButton />
        <h1 style={{ paddingTop: "15px", marginLeft: "60px", color: "white" }}>
          月結餐費
        </h1>
        <img
          src={image}
          alt="man"
          style={{ width: "70%", marginLeft: "60px", paddingTop: "30px" }}
        />
        <div style={{ display: "flex", marginLeft: "100px" }}>
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              style={{padding:"5px",border:"2px solid black"}}
            >
              {Array.from({ length: new Date().getFullYear() - 2023 + 1 }, (_, i) => 2023 + i).map((year) => (
                <option key={year} value={year}>
                  {year} 年
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              style={{padding:"5px",border:"2px solid black"}}
            >
              {Array.from({ length: selectedYear === new Date().getFullYear() ? new Date().getMonth() + 1 : 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month} 月
                </option>
              ))}
            </select>
          </div>
        </div>
        <strong>
          <h1 style={{ paddingTop: "20px", marginLeft: "150px" }}>
            $ {fee_information.accumulate_fee}
          </h1>
        </strong>
      </div>
      {fee_information && fee_information.history && Object.values(fee_information.history).length > 0 && (
      <div style={{ marginLeft: "10px", marginTop: "450px", flex: "1" }}>
        {Object.values(fee_information.history).map((item) => (
          <HistoryItem key={item.name} {...item} />
        ))}
      </div>
    )}
    </div>
  );
}

export default Fee;
