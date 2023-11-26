function Validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

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

    if(values.name === ""){
        error.name = "Name should not be empty"
    }else{
        error.name = ""
    }

    if(values.division === ""){
        error.division = "Division should not be empty"
    }else{
        error.division = ""
    }

    if(values.position === ""){
        error.position = "Position should not be empty"
    }else{
        error.position = ""
    }
    
    if(values.email === ""){
        error.email = "Name should not be empty"
    }else if(!email_pattern.test(values.email)){
        error.email = "E-mail do not match"
    }else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password do not match"
    }else{
        error.password = ""
    }

    if(values.check_password === ""){
        error.check_password = "Password should not be empty"
    }else if(values.check_password[0] !== values.password[0]){
        error.check_password = "Password do not match"
        console.log(values.check_password)
        console.log(values.password)
    }else{
        error.check_password = ""
    }
    return error
}
export default Validation;