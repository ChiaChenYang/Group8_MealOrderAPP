import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
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
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.status === "Success") {
            // Redirect to the home page with the user's ID
            navigate(`/${res.data.userId}/home`);
          } else {
            alert("No record existed");
            console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
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
