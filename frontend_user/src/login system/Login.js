import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import logo from "../image/logo.png";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log(values);
    if (errors.email === "" && errors.password === "") {
      // axios
      //   // .post("http://localhost:8081/login", values)
      //   .post("http://localhost:3000/users/consumer/login", values)
      //   .then((res) => {
      //     if (res.data.status === "Success") {
      //       // Redirect to the home page with the user's ID
      //       // navigate(`/${res.data.userId}/home`);
      //       navigate(`/${res.data.user.id}/home`);
      //     } else {
      //       alert("No record existed");
      //       console.log(res.data);
      //     }

        // })
        // .catch((err) => console.log(err));
        try {
          const response = await fetch(
            "http://localhost:3000/users/consumer/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );
    
          if (response.ok) {
            const responseData = await response.json();
            console.log("Data posted successfully：",responseData);
            navigate(`/${responseData.user.id}/home`);
          } else {
            console.error(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
    }
  };

  return (
    <div
      className="d-flex justify-content-center vh-100"
      style={{ width: "100%", backgroundColor: "#FFFEFD" }}
    >
      <div style={{ width: "90%", position: "absolute", top: "5%" }}>
        <img className="d-block mx-auto" src={logo} alt="logo" />
        <form action="" onSubmit={handleSubmit} className="row">
          <div className="mb-3">
            <label htmlFor="email">
              <strong>E-mail</strong>
            </label>
            <input
              type="email"
              placeholder="請輸入 E-mail"
              name="email"
              onChange={handleInput}
              className="form-control  rounded"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>密碼</strong>
            </label>
            <input
              type="password"
              placeholder="請輸入密碼"
              name="password"
              onChange={handleInput}
              className="form-control  rounded"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button
            id="login_btn"
            type="submit"
            className="btn btn-success rounded mx-auto"
            style={{ background: "#35A996", width: "350px" }}
          >
            <strong>登入</strong>
          </button>
          <p></p>
          <p style={{ textAlign: "center" }}>忘記密碼？</p>
          <p style={{ textAlign: "center" }}>
            還沒註冊嗎？{" "}
            <Link
              id="signup_link"
              to="/signup"
              className="btn btn-default border-0 text-warning rounded-0 text-decoration-none"
            >
              <strong>註冊</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
