// Select the elements we need from HTML.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

// Open and close the mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

// Close the mobile menu after clicking a navigation link.
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections when they enter the screen.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  // Fallback for browsers without IntersectionObserver.
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

// Highlight the navigation link for the visible section.
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Display the current year in the footer.
document.querySelector("#year").textContent = new Date().getFullYear();

// Prepare an email when the contact form is submitted.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);

  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const subject = data.get("subject").trim();
  const message = data.get("message").trim();

  // Replace this with your own email address.
  const recipient = "your.email@example.com";

  const emailSubject = encodeURIComponent(`[Portfolio] ${subject}`);

  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  );

  formNote.textContent = "Opening your email app...";

  window.location.href = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
});
