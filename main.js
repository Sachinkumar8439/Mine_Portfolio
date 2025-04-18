import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase,  ref, get, set, push, onValue  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn.querySelector("i");
const sendbtnicon = document.getElementById("sendicon");

 

const firebaseConfig = {
  apiKey: "AIzaSyDKaWkyJHbC9elLuhwoNi1NqA-xlq_4Va0",
  authDomain: "sachin-portfolio-e4b06.firebaseapp.com",
  databaseURL: "https://sachin-portfolio-e4b06-default-rtdb.firebaseio.com/",
  projectId: "sachin-portfolio-e4b06",
  storageBucket: "sachin-portfolio-e4b06.firebasestorage.app",
  messagingSenderId: "289384901522",
  appId: "1:289384901522:web:c9e5bb5bae79416f812f4b",
  measurementId: "G-LKEYCCY1L5"
};

async function  isOnline() {
  return fetch("https://www.google.com", { method: "HEAD" })
    .then(() => true) 
    .catch(() => false); 
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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


  function getNumberOfContacts(db) {
    const contactRef = ref(db, "portfolio/contacts");
  
    return get(contactRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const contactData = snapshot.val();
          return Object.keys(contactData).length; 
        } else {
          return 0; 
        }
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        return -1; 
      });
  }
  

  
  const incrementVisitorCount = async () => {
    const visitorRef = ref(db, "portfolio/visitorCount");
    const snapshot = await get(visitorRef);
    const count = snapshot.exists() ? snapshot.val() + 1 : 1;
    await set(visitorRef, count);
  };
  
  const displayVisitorCount = () => {
    const visitorRef = ref(db, "portfolio/visitorCount");
    onValue(visitorRef, (snapshot) => {
      document.getElementById("visitorCount").textContent = snapshot.val() || 0;
    });
  };
  const displayFeedback =  () => {
    const feedbackRef = ref(db, 'portfolio/feedback/likes');
    onValue(feedbackRef, (snapshot) => {
      document.getElementById('likeCount').textContent = snapshot.val() || 0;
    });
  };
  
function stopspinning(){
      sendbtnicon.classList.remove("spinning-icon");
      sendbtnicon.classList.remove("ri-loader-fill");
      sendbtnicon.classList.add("ri-telegram-fill");
    }
  
if(navigator.onLine)
  {
    getNumberOfContacts(db).then((count) => {
      if (count >= 0) {
        document.getElementById("contactsCount").textContent=`${count}++`;
      } else {
        console.log("Failed to fetch contact count.");
      }
    });
    displayVisitorCount();
    
    
  }  
  displayFeedback();
  
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
        name: `an UNKNOWN PERSON`,
        email: data.results[0].formatted ,
        phone: JSON.stringify(data.rate,null,2),
        message:`${JSON.stringify(data.results, null, 2)}`,
      };

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
        { getdetails(lat,long)
        }
        else return;
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

  if (!localStorage.getItem('visited')) {
    incrementVisitorCount();
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
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  try {
    emailjs.init("EOhduJp06AYSRR2tQ");
    emailjs
  .send("service_6e96rxi", "template_nknlh8o", params)
  .then((response) => {
    console.log("👋 Hi! Welcome!");
    alert("👋 Hi! Welcome! Thank you for contacting")
    stopspinning();
    reset();

  })
  .catch((error) => {
    console.error("Failed to send email:", error);
    stopspinning();
    alert("some thing went wrong reload the page and then try again")
  });
  
    
    const contactRef = ref(db, "portfolio/contacts");
    const newContact = push(contactRef);
    await set(newContact, params);  
    let cc = document.getElementById("contactsCount");
    cc.textContent = `${parseInt(cc.textContent) + 1}++`;

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}


document.getElementById("contactform").addEventListener('submit', async function(event) {
  event.preventDefault(); 
  sendbtnicon.classList.remove("ri-telegram-fill")
  sendbtnicon.classList.add("ri-loader-fill")
  sendbtnicon.classList.add("spinning-icon")

 let iline = await isOnline()
  if(iline)
  {
    alert("you are offline");
      stopspinning()


  }
  else{
    send(event); 

  }

});


const addBounceEffect = async (element) => {

  if(localStorage.getItem("liked"))
  {
    element.classList.remove("ri-thumb-up-fill")
    element.classList.add("ri-thumb-up-line")
  }

  else{
    element.classList.remove("ri-thumb-up-line")
    element.classList.add("ri-thumb-up-fill")

  }
  
  
  element.classList.add('bounce');
  
  element.addEventListener('animationend', () => {
    element.classList.remove('bounce');
  }, { once: true });
};
const likebutton = document.getElementById('likeButton');

if(localStorage.getItem("liked"))
{
  likebutton.classList.remove("ri-thumb-up-line")
  likebutton.classList.add("ri-thumb-up-fill")
}



const updateFeedback = async () => {
  addBounceEffect(likebutton);
  const feedbackRef = ref(db, 'portfolio/feedback/likes');
  const snapshot = await get(feedbackRef);
  let count;
  if(localStorage.getItem("liked"))
  {
    localStorage.removeItem("liked");
    count = snapshot.exists() && snapshot.val() > 0 ? snapshot.val() - 1 : 0;

  }
  else
  {
    localStorage.setItem("liked",true)
    count = snapshot.exists() ? snapshot.val() + 1 : 1;
  }
  await set(feedbackRef, count);
};


likebutton.addEventListener('click', updateFeedback);


// localStorage.clear()