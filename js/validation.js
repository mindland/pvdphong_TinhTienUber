function Validation(){

    this.kiemTraRong = function(value,mess) {
        if(value == ""){
            alert(mess);
            return false; 
        }
        return true; 
    }

    this.kiemTraGiaTri = function(value,mess) {
        value = parseInt(value); 
        if(value < 0){
            alert(mess);
            return false; 
        }
        return true; 
    }
}