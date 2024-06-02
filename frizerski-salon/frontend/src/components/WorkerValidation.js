function Validation(values){
    let error={}
  
    if (values.title===""){
        error.title="Ime ne bi trebalo biti prazno.";
    }
    else{
        error.title="";
    }
  
    if (values.description===""){
        error.description="Opis ne bi trebao biti prazan.";
    }
    else{
        error.description="";
    }
  
    return error;
  }
  
  export default Validation;