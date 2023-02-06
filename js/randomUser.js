 
$(document).ready(function () {

    var url = "https://randomuser.me/api/";
    fetchInformation(url);
    
});

/* Originalmente se cargaban los iconos de los paises desde esta web, pero debido a la politica CORS, opté por
el almacenamiento local*/
//let baseroute="https://img.freeflagicons.com/thumb/round_icon/";
let baseroute="images/flags/"
let endroute="_64.png";
/*
let countries = {
    "New Zealand": "new_zealand/new_zealand",
    "United Kingdom":"united_kingdom/united_kingdom",
    "United States":"united_states_of_america/united_states_of_america",
}*/

let countries = {
    "New Zealand": "new_zealand",
    "United Kingdom":"united_kingdom",
    "United States":"united_states_of_america",
    "Czech Republic":"czech_republic",
    "Bouvet Island": "bouvet_island",
    "Hong Kong":"hong_kong",
    "Dominican Republic":"dominican_republic",
    "United Arab Emirates":"united_arab_emirates"

}

function getCountryIcon(name){
    let output=baseroute;
    if (name in countries) {
        output+=countries[name]+endroute;
      } else {
        let lc = name.toLowerCase();
        //output+=lc + "/" + lc+endroute;
        output+=lc+endroute;
      }
    return output;
}

function countryLogoLoaded(itemClass) {   
    const element = document.querySelector(itemClass);
    element.style.opacity = "100%";
    element.style.animation= "fading 1s";
}

  
 
 function activateToolTip(sender, timed,getCoords=false){
    
    let obj =$( "."+sender+">.tooltiptext");
    obj.css( "visibility", "visible" );
    if(getCoords==true) {
        let selfElement= parseInt(obj.css("width"))
        let elemDims = getElemDims(sender);
        let coords=getCoordinates(sender);

        obj.css( "left", coords[1]+elemDims[1]/2-selfElement/2)
        obj.css( "top", coords[0]-elemDims[0]-4)
        obj.css( "height",  elemDims[0])
        obj.css( "bottom", "0")
    }
    
    if(timed==true) {
        let nIntervId = setInterval(()=>{
            obj.css( "visibility", "hidden" ),
            clearInterval(nIntervId);
        }, 1500);
    }
}


 function deactivateToolTip(sender){
    $( "."+sender+">.tooltiptext").css( "visibility", "hidden" );
 }


function fetchInformation(url) {

    fetch(url).then((response) => { if (response.ok)  return response.json();  }) .then(function (data) {
        
    let results=data.results[0];

        loadProfileAndLogo (results)
        loadNameAndAge(results)
        loadAdditionalData(results);

    }).catch((error) => {
        loadProfileAndLogo (defaultData, true)
        loadNameAndAge(defaultData)
        
        loadAdditionalData(defaultData);
    });

 
}

function loadProfileAndLogo (results, local=false) {
    profileImage=`<img src="${results.picture.large}" class="img-rounded" alt="image"></img>`;
    $("#profilePhoto").append(profileImage);
    let icon;
    let image;
    let country= results.location.country;

    if(checkMobileDevice()){
        image ="images/icons/globe.png";
        icon=`<div class="logoGlobe"  id="logoGlobe" onclick="activateToolTip('iconImg', true, true)"><div id="iconImg" class="iconImg"><img src="${image}"   alt="image" onload="countryLogoLoaded('.logoGlobe')"><span class="tooltiptext">${country}</span></div></div>`;                
    } else {
        if(local) {
        image="images/defaultCountryIcon.png";
        } else {image=getCountryIcon(country);}
       
        icon=`<div class="logoCountry"  id="logoCountry" onmouseover="activateToolTip('iconImg',false, true)"  onmouseout="deactivateToolTip('iconImg')"><div id="iconImg" class="iconImg"><img src="${image}" alt="image" onload="countryLogoLoaded('.logoCountry')"><span class="tooltiptext">${country}</span></div></div>`;
    }
    $("#profilePhoto").append(icon); 
}

function loadNameAndAge(results){
    fullname = `<div class="word-box" id><p>${results.name.title+"."}</p></div>
    <div class="word-box" id><p>${results.name.first}</p></div>
    <div class="word-box" id><p>${results.name.last}</p></div>`;
    $("#name-title").append(fullname);
    $("title").append(" - "+results.name.first+" "+results.name.last);
    let age= parseInt(results.dob["age"]);
    let modifiedAge=0;
    /* Desde la pagina vienen valores de edad un poco difíles de creer*/
    if(age>50){              
        modifiedAge= 50 - Math.round(Math.random() * 10);
    } else {
        modifiedAge=age; 
    }
    $("#age").append(modifiedAge);
}


function loadAdditionalData (results) {

    let moreInfo={
        "Dirección":results.location.street.name+" "+results.location.street.number,
        "Ciudad":results.location.city,
        "Estado":results.location.state,
        "Email":results.email,
        "Tel":results.cell,
        "Actualmente": "OpenToWork!"
    }

    Object.keys(moreInfo).forEach(key => {
        let item=   `<div class="dlItem"><dt>${key}: </dt><dd>${moreInfo[key]}</dd></div>`;
        $("#datosdl").append(item); 
    });
}


let defaultData={"name":{"title":"Mr","first":"Breds","last":"Van der Krogt"},"location":{"street":{"number":9858,"name":"Burgemeester Petersstraat"},"city":"Heemstede","state":"Gelderland","country":"Netherlands","postcode":"5555 AP"},"email":"kadir.vanderkrogt@example.com","dob":{"date":"1998-09-23T23:28:29.347Z","age":24},"phone":"(0184) 365065","cell":"(06) 60196293", "picture":{"large":"images/defaultProfilePhoto.jpg"}};
