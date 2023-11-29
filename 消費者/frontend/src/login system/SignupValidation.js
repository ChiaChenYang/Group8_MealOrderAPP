function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  //身分驗證
  // if(values.status === ""){
  //     error.status = "Status should not be empty"
  // }else if(values.status[0] !== '0' && values.status[0] !== '1'){
  //     error.status = "The status should be 0(消費者) or 1(商家)"
  //     console.log(values.status[0])
  // }
  // else{
  //     error.status = ""
  // }

  if (values.name === "") {
    error.name = "欄位不得為空";
  } else {
    error.name = "";
  }

  if (values.division === "") {
    error.division = "欄位不得為空";
  } else {
    error.division = "";
  }

  if (values.position === "") {
    error.position = "欄位不得為空";
  } else {
    error.position = "";
  }

  if (values.email === "") {
    error.email = "欄位不得為空";
  } else if (!email_pattern.test(values.email)) {
    error.email = "E-mail 不符合格式";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "欄位不得為空";
  } else if (!password_pattern.test(values.password)) {
    error.password = "密碼不符合格式，需要有英文大小寫加上數字";
  } else {
    error.password = "";
  }

  if (values.check_password === "") {
    error.check_password = "欄位不得為空";
  } else if (values.check_password[0] !== values.password[0]) {
    error.check_password = "與上述密碼不同";
    console.log(values.check_password);
    console.log(values.password);
  } else {
    error.check_password = "";
  }
  return error;
}
export default Validation;
