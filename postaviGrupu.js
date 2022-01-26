var dugme = document.getElementById("send")
dugme.onclick = function(event){ 
    event.preventDefault()   
    var obj = new Object()
    obj.index = document.getElementById("brIndex").value
    obj.grupa = document.getElementById("grupa").value

    StudentAjax.postaviGrupu(obj.index, obj.grupa, function(err,data){
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