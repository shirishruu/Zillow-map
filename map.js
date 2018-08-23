// Put your zillow.com API key here
var zwsid = "X1-ZWz19uikc42wi3_7j3qs";

var request = new XMLHttpRequest();
var addr,geocoder,map,marker,value;
var final="<h2>History<h2><h4>Zestimate\t\t\tAddress</h4>\n"

function initialize () 
{
    //var infoWindow = new google.maps.InfoWindow;
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), 
    {
            center: {lat: 32.75, lng: -97.13},
                zoom: 17
    });   
    marker = new google.maps.Marker({
                    map: map,
                    position: {lat: 0, lng: 0}
                });
    map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
    

}
function placeMarkerAndPanTo(latLng,map) {
    
  var lastmarker=marker;
    lastmarker.setMap(null);

  geocoder.geocode({'location': latLng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              map.setZoom(17);
              addr=results[0].formatted_address;
              dispamt(addr)
              document.getElementById("address").value= addr;
              marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
              /*infoWindow.setContent(addr);
                    
               infoWindow.open(marker.get('map'), marker);*/
             
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
  map.panTo(latLng);
  
}

function displayResult () 
{
    
    
    if (request.readyState == 4) {
        infowindow = new google.maps.InfoWindow({
            content: "<pre>Address: "+addr+"</pre>"
         });
        infowindow.open(marker.get('map'), marker);
         
         var xml = request.responseXML.documentElement;
         
        
        value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
        infowindow.setContent("<pre>Address: "+addr+"\nZestimate: $"+value+"</pre>");
        /*infowindow = new google.maps.InfoWindow({
            content: "<pre>"+addr+"\n"+value+"</pre>"
         });*/
        infowindow.open(marker.get('map'), marker);
	    //document.getElementById("output").innerHTML = value+"\t\t"+addr;
        final=final+value+"\t\t\t"+addr+"\n";
        document.getElementById("output").innerHTML = "<pre>"+final+"</pre>";
       
    }
}

function moveto(address,city,state,zipcode)
{
    var lastmarker=marker;
    lastmarker.setMap(null);
    //if (request.readyState == 4) {
        //infoWindow.setContent(addr);
         
        //var xml = request.responseXML.documentElement;
        
        geocoder.geocode( { 'address': addr}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) 
            {

                map.setCenter(results[0].geometry.location);
                map.setZoom(17);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                //infoWindow.open(marker.get('map'), marker);
            } 
            else 
            {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        sendreq(address,city,state,zipcode);
        //displayResult();
        /*var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
        document.getElementById("output").innerHTML = value+"\t\t"+addr;*/
    //}
}

function dispamt(addrs)
{   
    var adr = addrs.split(',', 4);
    var adr2=adr[2].split(' ',3)
    var address=adr[0];
    var city=adr[1];
    var state=adr2[1];
    var zipcode=adr2[2];
    addr=address+","+city+","+state+" "+zipcode
    //document.getElementById("output").innerHTML = address+","+city+","+state+","+zipcode;
    /*request.onreadystatechange = displayResult;
    request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode);
    request.withCredentials = "true"; 
    //var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
    //document.getElementById("output").innerHTML = value+"   "+addr; 
    request.send(null);*/
    sendreq(address,city,state,zipcode);
    
}
function sendreq(address,city,state,zipcode)
{
    request.onreadystatechange = displayResult;
    request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode);
    request.withCredentials = "true"; 
    request.send(null);
}
function sendRequest () 
{
    var lastmarker=marker;
    lastmarker.setMap(null);
    //request.onreadystatechange = moveto;
    var address = document.getElementById("address").value;
    adr=address.split(',', 4);
    var adr2=adr[2].split(' ',3)
    var addres=adr[0];
    var city=adr[1];
    var state=adr2[1];
    var zipcode=adr2[2];
    addr=addres+","+city+","+state+" "+zipcode
    moveto(addres,city,state,zipcode);
    /*request.open("GET","proxy.php?zws-id="+zwsid+"&address="+addres+"&citystatezip="+city+"+"+state+"+"+zipcode);
    request.withCredentials = "true";  
    request.send(null);*/
}

function Clear()
{
    document.getElementById("address").value= "";
}