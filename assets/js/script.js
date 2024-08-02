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
      const modalContainer = document.getElementById("project-modal");

      if (!modalContainer) {
        console.error("Modal not found.");
        return;
      }

      console.log("Opening modal for:", projectTitle);

      let modalDescription, newImageSrc, additionalContent, projectLink;

      if (projectTitle === "Super Market sales analysis") {
        modalDescription = "This project analyzes supermarket sales data to gain insights into product performance, customer behavior, and revenue trends.";
        newImageSrc = "./assets/images/project-09.png";
        additionalContent = `
          <div class="blog-image">
            <img src="./assets/images/project-11.png" alt="Additional Image" loading="lazy">
          </div>
          <p class="blog-description">Below are some following questions analyzed on this dataset:</p>
          <p class="blog-description">• What are the most selling Products?</p>
          <p class="blog-description">• Which are the top 10 Products according to Sales?</p>
          <p class="blog-description">• Which Products have proved to be the most profitable?</p>
          <p class="blog-description">• What category sold the most?</p>
          <p class="blog-description">• Which category is the most Profitable?</p>
          <p class="blog-description">• What are the most selling products in each subcategory?</p>
          <p class="blog-description">• Which customer segments are the most profitable?</p>
          <p class="blog-description">• Which Shipping modes sold the most products?</p>
          <p class="blog-description">• What markets sold the most Products?</p>
          <p class="blog-description">• Which are the top 10 countries by sales?</p>
          <p class="blog-description">• What's the average shipping cost for the top 10 different countries?</p>
          <div class="blog-image">
            <img src="./assets/images/project-12.png" alt="Another Image" loading="lazy">
          </div>
        `;
        projectLink = "https://github.com/brenmathew/Data-Analysis/blob/main/SuperMarketSales_Analysis.ipynb";
      } else if (projectTitle === "Netflix") {
        modalDescription = "The following is a Netflix Analysis of various TV Shows and Movies acquired from a dataset through Kaggle. We can see the description and genres of movies all at once through this dashboard.";
        newImageSrc = "./assets/images/project-20.png";
        additionalContent = `
          <div class="blog-image">
            <img src="./assets/images/project-21.png" alt="Additional Image" loading="lazy">
          </div>
          <p class="blog-description">This project is for Netflix. Below are the key insights:</p>
          <p class="blog-description">• Analyze TV shows and movie genres</p>
          <p class="blog-description">• Interactive dashboard to filter data</p>
          <p class="blog-description">• Comprehensive overview of Netflix's content library</p>
          <div class="blog-image">
            <img src="./assets/images/project-22.png" alt="Another Image" loading="lazy">
          </div>
        `;
        projectLink = "https://public.tableau.com/app/profile/brenmathew/viz/NetflixAnalysis_16769869059570/Netflix";
      } else {
        modalDescription = `Detailed description of ${projectTitle}.`;
        newImageSrc = projectItem.querySelector("img")?.src || "";
        additionalContent = "";
        projectLink = "https://github.com/brenmathew";
      }

      // Populate modal with specific project details
      modalContainer.classList.add("active");
      modalContainer.querySelector(".portfolio-modal-title").textContent = projectTitle;
      modalContainer.querySelector(".modal-date").textContent = projectTitle === "Netflix" ? "Link to the entire code below:" : "14 June, 2021";
      modalContainer.querySelector(".portfolio-modal-content").textContent = modalDescription;
      modalContainer.querySelector(".modal-image img").src = newImageSrc;
      modalContainer.querySelector(".additional-content").innerHTML = additionalContent;

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
