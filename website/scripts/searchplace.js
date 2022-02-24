var placeList = [];
var selectedPlace = null;

function searchPlace(){
    var place=document.getElementById("destination").value;
    var url="https://nominatim.openstreetmap.org/search?q=" + encodeURIComponent(place) +"&format=json&addressdetails=1";
    
    $.getJSON(url,function(data){
        // console.log(data);
        //console.log(data.length);
        document.getElementById("listadestinazioni").innerHTML="";
        placeList = data;
        for(let i=0;i<data.length;i++){
            var place=data[i];
            //console.log(place.display_name);
            var p=document.createElement("p");
            p.classList.add("searchresults");
            p.appendChild(document.createTextNode(place.display_name));
            p.setAttribute("onclick", "buttonclicked("+i+")");
            document.getElementById("listadestinazioni").appendChild(p);
        }

        if(data.length == 0){
            var p=document.createElement("p");
            p.classList.add("noresults");
            p.appendChild(document.createTextNode("No results found"));
            document.getElementById("listadestinazioni").appendChild(p);
        }
    });

}

function buttonclicked(destination){
    document.getElementById("destination").value=placeList[destination].display_name;
    selectedPlace = new GpsCoordinates(placeList[destination].lat,placeList[destination].long);
}