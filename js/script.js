var targetElm = document.querySelector(".scrollable");
var lastElement = document.querySelector(".scrollContent");
var firstElement = document.querySelector("#codProg");
let lastKnownScrollPosition = 0;
let ticking = false;
var r = document.querySelector(":root");
let offsetHeigth = 0;
let actual = 0;



function doScroll(scrollPos) {
  offsetHeight = targetElm.offsetHeight;
  actual = targetElm.scrollTop;
  let percentage = Math.round(
    (actual / (targetElm.scrollHeight - offsetHeight)) * 100
  );
  r.style.setProperty("--percentageFinal", percentage + 25 + "%");
  r.style.setProperty("--percentageMiddle", percentage + "%");
  r.style.setProperty("--percentageInit", percentage - 25 + "%");
}

targetElm.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      doScroll(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});

const launchInfo = function () {
  $(".chart").empty();
  $(".chart").easyPieChart({
    size: 60,
    barColor: "#0797da",
    scaleLength: 0,
    lineWidth: 8,
    trackColor: "#00354e",
    lineCap: "circle",
    animate: 2000,
  });

  $(".chart").each(function () {
    d = document.createElement("p");
    d.className = "percentageLabel";
    d.append(this.dataset.percent + " %");
    this.append(d);
  });
};

const launchActitude = function () {
  $(".myBar").each(function () {
    let i=0;
    if (i == 0) {
      i = 1;
      var elem = this;
      var width = 1;
      var id = setInterval(()=>{
    
        if (width >= this.dataset.percent ) {
          clearInterval(id);
          i = 0; 
        } else {
          width++;
          elem.style.width = width + "%";
        }

      }, 10);
    }
  })
};


const launchDatos = function () {
  $(".dlItem").each(function () {
    let i=0;

    
    if (i == 0) {
      i = 1;
      var elem = this;
      elem.style.opacity = 0 + "%";
      var opacity = 1;
      var id = setInterval(()=>{
    
        if (opacity >= 100 ) {
          clearInterval(id);
          i = 0; 
        } else {
          opacity++;
          elem.style.opacity = opacity + "%";
        }

      }, 10);
    }
  })
}

let functions = {
  actitud: launchActitude,
  informatica: launchInfo,
  datos: launchDatos,
};

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].nextElementSibling.style.display = "none";

  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
      return;
    }

    let accordions = document.getElementsByClassName("accordion");
    for (j = 0; j < accordions.length; j++) {
      if (this != accordions[j]) {
        accordions[j].classList.remove("active");
      }
      accordions[j].nextElementSibling.style.display = "none";
    }
    panel.style.display = "block";
    functions[this.id]();
  });
}




$(document).ready(function () {
 
 if(checkMobileDevice){
  const element = document.querySelector(".page-wrap");
    element.style.top = "40px";
    element.style.height = "90vh"; 
 } 

 $(".lifeicons").each(function () {
 
  
  this.setAttribute("onmouseover","activateToolTip(this.id,"+checkMobileDevice()+", true)" )
  this.setAttribute("onmouseout","deactivateToolTip(this.id)" )
 });
});





let slideIndex = 1;
showSlides(slideIndex);

 
function plusSlides(n) {
  showSlides((slideIndex += n));
}
 
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
  for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const checkMobileDevice = function () {
  let navegador = navigator.userAgent;
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};


function getCoordinates(id) {
  const element = document.getElementById(id);
  let coords= [element.offsetTop,element.offsetLeft]
  return coords;
}

function getElemDims(id) {
  const element = document.getElementById(id);
  let dims= [element.offsetHeight, element.offsetWidth]
  return dims;
}
