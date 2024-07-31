'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all modal items
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

// Add event in all select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category.toLowerCase()) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ChatGPT
document.addEventListener("DOMContentLoaded", function() {
  const projectLinks = document.querySelectorAll(".project-link");

  projectLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const projectItem = this.closest(".project-item");
      if (!projectItem) {
        console.error("Project item not found.");
        return;
      }

      const projectTitle = projectItem.querySelector(".project-title")?.textContent || "No title";
      const projectImage = projectItem.querySelector("img")?.src || "";
      const modalContainer = document.getElementById("project-modal");

      if (!modalContainer) {
        console.error("Modal not found.");
        return;
      }

      console.log("Opening modal for:", projectTitle);

      // Populate modal with specific project details
      modalContainer.classList.add("active");
      modalContainer.querySelector(".portfolio-modal-title").textContent = projectTitle;
      
      // Set the modal content based on project title
      let modalDescription;
      let newImageSrc;
      let projectLink;

      if (projectTitle === "Super Market sales analysis") {
        modalDescription = "This project analyzes supermarket sales data to gain insights into product performance, customer behavior, and revenue trends. 
          By understanding the provided dataset (supermarket_sales.csv),
          it aims to deliver valuable visualizations and information to improve sales strategies and decision-making.";
        newImageSrc = "assets/images/project-20.png";
        projectLink = "https://github.com/brenmathew/Data-Analysis/blob/main/SuperMarketSales_Analysis.ipynb";
      } else if (projectTitle === "Orizon") {
        modalDescription = "As you hover over the dashboard, you make the changes, adjust your preferences to see the exact statistics of the data needed.";
        newImageSrc = "assets/images/project-2.png";
        projectLink = "https://public.tableau.com/app/profile/brenmathew/viz/NetflixAnalysis_16769869059570/Netflix";
      } else {
        modalDescription = `Detailed description of ${projectTitle}.`;
        newImageSrc = projectImage; // Use original project image
        projectLink = "https://github.com/brenmathew"; // Default link
      }

      modalContainer.querySelector(".portfolio-modal-content").textContent = modalDescription;
      modalContainer.querySelector(".modal-image img").src = newImageSrc;

      // Update project link button
      const projectLinkButton = modalContainer.querySelector(".project-link-button");
      projectLinkButton.href = projectLink;

      const closeButton = modalContainer.querySelector(".portfolio-modal-close-btn");
      closeButton.onclick = function() {
        modalContainer.classList.remove("active"); // Hide the modal
        window.removeEventListener("click", outsideClickListener);
      };

      // Define the outside click listener
      const outsideClickListener = function(event) {
        const isClickInside = modalContainer.querySelector(".portfolio-modal").contains(event.target);
        if (!isClickInside && modalContainer.classList.contains("active")) {
          modalContainer.classList.remove("active"); // Hide the modal
          window.removeEventListener("click", outsideClickListener); // Remove the listener after hiding
        }
      };

      // Attach the event listener
      setTimeout(() => {
        window.addEventListener("click", outsideClickListener);
      }, 0); // Timeout ensures it does not trigger immediately after opening

      // Stop propagation on modal content to prevent closing the modal
      modalContainer.querySelector(".portfolio-modal").addEventListener("click", function(event) {
        event.stopPropagation();
      });
    });
  });
});


// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach(page => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks.forEach(navLink => navLink.classList.remove("active"));
        this.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });
  });
});
