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
          // typingElement.style.background = "none";
          // typingElement.style.padding = "0px";
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

// about container
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

// service container
ScrollReveal().reveal(".project__card", {
  ...scrollRevealOption,
  interval: 500,
});

// portfolio container
ScrollReveal().reveal(".portfolio__card", {
  duration: 1000,
  interval: 200,
});

async function send(event) {
  event.preventDefault();
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };
  console.log(params);
  emailjs.init("EOhduJp06AYSRR2tQ");
  emailjs.send("service_6e96rxi", "template_nknlh8o", params).then(
    function () {
      alert("mail Sent");
    },
    function (error) {
      alert("Something went wrong");
    }
  );
}
