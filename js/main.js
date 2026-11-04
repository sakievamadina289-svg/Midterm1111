(() => {
  "use strict";

  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const registrationForm = document.querySelector("#registrationForm");
  if (registrationForm) {
    const form = registrationForm;
    const phone = form.querySelector("#applicantPhone");
    const password = form.querySelector("#password");
    const confirmPassword = form.querySelector("#confirmPassword");
    const startDate = form.querySelector("#startDate");
    const submitButton = form.querySelector("#registrationSubmit");
    const feedback = form.querySelector("#registrationFeedback");
    const programSelect = form.querySelector("#program");
    const studyOptionError = form.querySelector("#studyOptionError");
    const studyOptions = Array.from(form.querySelectorAll('[name="studyOption"]'));
    const validationControls = Array.from(form.querySelectorAll("input, select, textarea"))
      .filter((control) => control.type !== "hidden" && control.name !== "website");
    const touchedControls = new WeakSet();
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    startDate.min = localToday;

    const setPasswordValidity = () => {
      confirmPassword.setCustomValidity(
        confirmPassword.value && confirmPassword.value !== password.value ? "Passwords do not match." : ""
      );
    };

    const setPhoneValidity = () => {
      const digits = phone.value.replace(/\D/g, "");
      const validCharacters = /^\+?[\d\s().-]+$/.test(phone.value.trim());
      phone.setCustomValidity(
        !phone.value || (validCharacters && digits.length >= 7 && digits.length <= 15)
          ? ""
          : "Enter a valid phone number with 7–15 digits."
      );
    };

    const updateValidity = () => {
      setPasswordValidity();
      setPhoneValidity();
      validationControls.forEach((control) => {
        if (touchedControls.has(control)) {
          control.classList.toggle("is-invalid", !control.checkValidity());
        }
      });
      const studyOptionTouched = studyOptions.some((control) => touchedControls.has(control));
      const studyOptionSelected = studyOptions.some((control) => control.checked);
      studyOptionError.classList.toggle("d-block", studyOptionTouched && !studyOptionSelected);
      submitButton.disabled = !form.checkValidity();
      feedback.textContent = "";
      feedback.classList.remove("error");
    };

    const programFromUrl = new URLSearchParams(window.location.search).get("program");
    if (programFromUrl && Array.from(programSelect.options).some((option) => option.value === programFromUrl)) {
      programSelect.value = programFromUrl;
    }

    form.addEventListener("input", updateValidity);
    form.addEventListener("change", updateValidity);
    form.addEventListener("blur", (event) => {
      if (validationControls.includes(event.target)) {
        touchedControls.add(event.target);
        updateValidity();
      }
    }, true);
    password.addEventListener("input", () => {
      setPasswordValidity();
      updateValidity();
    });
    confirmPassword.addEventListener("input", () => {
      setPasswordValidity();
      updateValidity();
    });
    phone.addEventListener("input", () => {
      setPhoneValidity();
      updateValidity();
    });
    updateValidity();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      setPasswordValidity();
      setPhoneValidity();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        updateValidity();
        return;
      }

      feedback.textContent = "Your application details are complete. This demo has not sent or stored your information.";
      feedback.classList.remove("error");
      feedback.focus();
      form.classList.add("was-validated");
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    const form = contactForm;
    const captcha = form.querySelector("#captchaAnswer");
    const honeypot = form.querySelector("#contactWebsite");
    const feedback = form.querySelector("#contactFeedback");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      captcha.setCustomValidity(captcha.value === "7" ? "" : "Please enter the correct answer (7).");
      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        feedback.textContent = "Please review the highlighted fields and try again.";
        feedback.classList.add("error");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (honeypot.value.trim()) {
        feedback.textContent = "We couldn’t submit this message. Please try again.";
        feedback.classList.add("error");
        return;
      }

      feedback.textContent = "Thanks for your message. This demo has validated it in your browser but has not sent or stored it.";
      feedback.classList.remove("error");
      feedback.focus();
      form.reset();
      captcha.setCustomValidity("");
      form.classList.remove("was-validated");
    });

    captcha.addEventListener("input", () => captcha.setCustomValidity(""));
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  if (filterButtons.length) {
    const stories = document.querySelectorAll(".story-item");
    const noResults = document.querySelector("#storyNoResults");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.filter;
        let visibleCount = 0;
        filterButtons.forEach((filterButton) => {
          const isActive = filterButton === button;
          filterButton.classList.toggle("active", isActive);
          filterButton.setAttribute("aria-pressed", String(isActive));
        });
        stories.forEach((story) => {
          const isVisible = category === "all" || story.dataset.category === category;
          story.hidden = !isVisible;
          if (isVisible) visibleCount += 1;
        });
        noResults.hidden = visibleCount > 0;
      });
    });
  }

  const faqSearch = document.querySelector("#faqSearch");
  if (faqSearch) {
    const faqItems = Array.from(document.querySelectorAll(".faq-item"));
    const noResults = document.querySelector("#faqNoResults");
    faqSearch.addEventListener("input", () => {
      const query = faqSearch.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      faqItems.forEach((item) => {
        const isVisible = item.textContent.toLocaleLowerCase().includes(query);
        item.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });
      noResults.hidden = visibleCount > 0;
    });
  }
})();
