const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".close");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let currentIndex = 0;

images.forEach((image, index) => {
  image.addEventListener("click", () => {
    currentIndex = index;
    lightboxImage.src = image.src;
    lightbox.classList.add("active");
  });
});

closeButton.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  lightboxImage.src = images[currentIndex].src;
});

prevButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  lightboxImage.src = images[currentIndex].src;
});

const filterButtons = document.querySelectorAll(".filter_btns button");

const gallteryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    gallteryItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
