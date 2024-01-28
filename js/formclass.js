export default class Form {
  constructor(
    name,
    nameRegex,
    email,
    emailRegex,
    phone,
    phoneRegex,
    age,
    ageRegex,
    password,
    passwordRegex,
    repassword
  ) {
    this.name = { 
      selector: name,
      valid: {
        value:false ,
        trueMSG:"Valid Name", 
        falseMSG:"Spicial charcters is not allowed Minimum *4 chars"
      },
      regex: new RegExp(nameRegex) 
    };
    this.email = {
      selector: email,
      valid: {
        value:false ,
        trueMSG:"Valid Email", 
        falseMSG:"Email not valid *exemple@yyy.zzz"
      },
      regex: new RegExp(emailRegex),
    };
    this.phone = {
      selector: phone,
      valid: {
        value:false ,
        trueMSG:"Valid Phone number", 
        falseMSG:"Enter valid Phone Number"
      },
      regex: new RegExp(phoneRegex),
    };
    this.age = { 
      selector: age,
      valid: {
        value:false ,
        trueMSG:"Valid age", 
        falseMSG:"Age must be * 18 : 99"
      },
      regex: new RegExp(ageRegex) 
    };
    this.password = {
      selector: password,
      valid: {
        value:false ,
        trueMSG:"Valid Password", 
        falseMSG:"Enter valid password *Minimum 8 chars, at least one big letter , one small letter ,one spcial char and one number *"
      },
      regex: new RegExp(passwordRegex),
    };
    this.repassword = {
      selector:repassword,
      valid: {
        value:false ,
        trueMSG:"Identical Password", 
        falseMSG:"Repassword must be identical as password"
      },
    };
  }
  isAllValid(){
    if(this.name.valid.value && this.email.valid.value && this.phone.valid.value && this.age.valid.value && this.password.valid.value && this.repassword.valid.value){

      return true
    }
    else{
      return false
    }
  }
}
