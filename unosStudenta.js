var dugme = document.getElementById("send")
dugme.onclick = function(event){ 
    event.preventDefault()   
    var obj = new Object()
    obj.ime = document.getElementById("ime").value
    obj.prezime = document.getElementById("prezime").value
    obj.index = document.getElementById("brIndex").value
    obj.grupa = document.getElementById("grupa").value

    StudentAjax.dodajStudenta(obj, function(err,data){
        if(err != null) alert(err)
        else{
            var div = document.getElementById("ajaxstatus");
            div.innerHTML = "";
            const para = document.createElement("p");
            para.innerText = data;
            div.appendChild(para);
        }
        
    })

}