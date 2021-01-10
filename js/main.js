// CONSTANT PRICE
const NGUONG_1 = 1, NGUONG_2 = 20; 
const UBER_X_1 = 8000, UBER_X_2 = 12000, UBER_X_3 = 10000, UBER_X_CHO = 2000;     // UBER X
const UBER_SUV_1 = 9000, UBER_SUV_2 = 14000, UBER_SUV_3 = 12000, UBER_SUV_CHO = 3000; // UBER SUV
const UBER_BLACK_1 = 10000, UBER_BLACK_2 = 16000, UBER_BLACK_3 = 14000, UBER_BLACK_CHO = 4000; // UBER BLACK

// CONSTANT MESSAGE
const mess_loaiXe = "Vui lòng chọn loại xe"; 
const mess_soKm = "Vui lòng nhập số km"; 
const mess_tgCho = "Vui lòng nhập thời gian chờ"
const mess_soKm_KAM = "Vui lòng nhập số km không âm"
const mess_tgCho_KAM = "Vui lòng nhập thời gian chờ không âm"

// Khai bao bien toan cuc
var tgCho = getEle("tgCho").value ; 

getEle("tinhTien").addEventListener("click", function() {
    var selector = document.getElementsByName('selector');
    var loaiXe="";
    for(var i = 0; i < selector.length; i++){
        if(selector[i].checked){
            loaiXe = selector[i].value;
        }   
    }

    var soKm =  document.getElementById("soKm").value; 
    var tgCho = document.getElementById("tgCho").value ; 

    if(!validation(loaiXe,soKm,tgCho)) return ;

    var tongTien = 0;  

    switch (loaiXe) {
        case "UBER_X":
            tongTien = tinhTien(soKm, tgCho, UBER_X_1, UBER_X_2, UBER_X_3, UBER_X_CHO);; 
            break;
        case "UBER_SUV":
            tongTien = tinhTien(soKm, tgCho, UBER_SUV_1, UBER_SUV_2, UBER_SUV_3, UBER_SUV_CHO); 
            break;
        case "UBER_BLACK":
            tongTien = tinhTien(soKm, tgCho, UBER_BLACK_1, UBER_BLACK_2, UBER_BLACK_3, UBER_BLACK_CHO); 
            break;
        default:
            break;
    }    
    getEle("divThanhTien").style.display = "block"; 
    getEle("xuatTien").innerHTML = tongTien;

})


getEle("inHoaDon").addEventListener("click", function() {
    var selector = document.getElementsByName('selector');
    var loaiXe = ""; 
    for(var i = 0; i < selector.length; i++){
        if(selector[i].checked){
            loaiXe = selector[i].value;
        }
    }

    var soKm =  document.getElementById("soKm").value; 
    var tgCho = document.getElementById("tgCho").value ; 
    
    if(!validation(loaiXe,soKm,tgCho)) return ;

    switch (loaiXe) {
        case "UBER_X":
            taobang(loaiXe, soKm, tgCho, UBER_X_1, UBER_X_2, UBER_X_3, UBER_X_CHO); 
            break;
        case "UBER_SUV":
            taobang(loaiXe, soKm, tgCho, UBER_SUV_1, UBER_SUV_2, UBER_SUV_3, UBER_SUV_CHO); 
            break;
        case "UBER_BLACK":
            taobang(loaiXe, soKm, tgCho, UBER_BLACK_1, UBER_BLACK_2, UBER_BLACK_3, UBER_BLACK_CHO); 
            break;
        default:
            break;
    }    
   
    getEle("in").click(); 
})

function validation(loaiXe,soKm,tgCho) {
    var validation = new Validation(); 
    var isValid = true;  

    isValid &= validation.kiemTraRong(loaiXe,mess_loaiXe);
    if(!isValid) return false;

    isValid &= validation.kiemTraRong(soKm,mess_soKm);
    if(!isValid) return ;false

    isValid &= validation.kiemTraRong(tgCho,mess_tgCho);
    if(!isValid) return false;

    isValid &= validation.kiemTraGiaTri(soKm,mess_soKm_KAM);
    if(!isValid) return false;

    isValid &= validation.kiemTraGiaTri(tgCho,mess_tgCho_KAM);
    if(!isValid) return false;

    return true; 
}

function tinhTien(soKm, tgCho, gia1, gia2, gia3, giaCho){
    soKm = parseInt(soKm);
    tgCho = parseInt(tgCho); 
    var tongTien = 0; 
    if(soKm <= NGUONG_1){
        tongTien = soKm*gia1; 
    }
    else if ( soKm > NGUONG_1 && soKm <= NGUONG_2) {
        tongTien = NGUONG_1*gia1 + (soKm - NGUONG_1)*gia2 ; 
    }
    else {
        tongTien = NGUONG_1*gia1 + (NGUONG_2 - NGUONG_1)*gia2 + (soKm - NGUONG_2)*gia3; 
    }
    tongTien = tongTien + tgCho * giaCho; 
    return tongTien; 
}

function taobang(loaiXe ,soKm, tgCho, gia1, gia2, gia3, giaCho) {
    var table = getEle("hoaDon");
    var content = ""; 
    soKm = parseInt(soKm);
    tgCho = parseInt(tgCho); 
    var tongTien = 0; 

    if(soKm <= NGUONG_1){
        tongTien = soKm*gia1; 
        content += `
            <tr>
                <td>${getLoaiXe(loaiXe)}</td>
                <td>${soKm}</td>
                <td>${gia1}</td>
                <td>${tongTien}</td>
            </tr>
        `   
    }
    else if ( soKm > NGUONG_1 && soKm <= NGUONG_2) {
        var tong1 = NGUONG_1*gia1; 
        var tong2 = (soKm - NGUONG_1)*gia2;
        tongTien = tong1 + tong2 ; 
        content += `
            <tr>
                <td>${getLoaiXe(loaiXe)}</td>
                <td>${NGUONG_1}</td>
                <td>${gia1}</td>
                <td>${tong1}</td>
            </tr>
            <tr>
                <td>${getLoaiXe(loaiXe)}</td>
                <td>${soKm-NGUONG_1}</td>
                <td>${gia2}</td>
                <td>${tong2}</td>
            </tr>
        `   
    }
    else {
        var tong1 = NGUONG_1*gia1; 
        var tong2 =  (NGUONG_2 - NGUONG_1)*gia2;
        var tong3 =  (soKm - NGUONG_2)*gia3;
        tongTien = tong1 + tong2 + tong3; 
        content += `
            <tr>
                <td>${getLoaiXe(loaiXe)}</td>
                <td>${NGUONG_1}</td>
                <td>${gia1}</td>
                <td>${tong1}</td>
            </tr>
            <tr>
                <td>${getLoaiXe(loaiXe)}</td>
                <td>${NGUONG_2-NGUONG_1}</td>
                <td>${gia2}</td>
                <td>${tong2}</td>
            </tr>
            <tr>
                <td>${getLoaiXe(loaiXe)}</td>
                <td>${soKm-NGUONG_2}</td>
                <td>${gia3}</td>
                <td>${tong3}</td>
            </tr>
        `   
    }

    tienCho = tgCho * giaCho; 
    content += `
            <tr>
                <td>Thời gian chờ</td>
                <td>${tgCho}</td>
                <td>${giaCho}</td>
                <td>${tienCho}</td>
            </tr>
        `   
    tongTien = tongTien + tienCho; 
    
    content += `
            <tr  class="table-success">
                <td colspan="3">Total</td>
                <td>${tongTien}</td>
            </tr>
            `
    table.innerHTML = content; 

    return tongTien; 
}

function getLoaiXe (loaiXe) {
    if(loaiXe == "UBER_X") return "Uber X";
    if(loaiXe == "UBER_SUV") return "Uber SUV";
    if(loaiXe == "UBER_BLACK") return "Uber Black";
}


function getEle(id){
    return document.getElementById(id); 
}