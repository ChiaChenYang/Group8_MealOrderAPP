function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.email === "") {
    error.email = "欄位不得為空";
  } else if (!email_pattern.test(values.email)) {
    error.email = "E-mail 格式錯誤";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "欄位不得為空";
  } else if (!password_pattern.test(values.password)) {
    error.password = "密碼錯誤";
  } else {
    error.password = "";
  }
  return error;
}
export default Validation;
