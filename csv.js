var dugme = document.getElementById("csvdugme")
dugme.onclick = function(event){
    event.preventDefault()
    //console.log("nakon dugme click: " + document.getElementById("csv").value);
    StudentAjax.dodajBatch(document.getElementById("csv").value, function(err,data){
        if(err != null)
            alert(err)
        else{
            var div = document.getElementById("ajaxstatus");
            div.innerHTML = "";
            const para = document.createElement("p");
            para.innerText = data;
            div.appendChild(para);
        }
    })

}