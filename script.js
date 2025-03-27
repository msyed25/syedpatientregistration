document.addEventListener("DOMContentLoaded", function () {
    const reviewBtn = document.getElementById("review-btn");
    const reviewModal = document.getElementById("review-modal");
    const closeModal = document.getElementById("close-modal");
    const reviewContent = document.getElementById("review-content");

    reviewBtn.addEventListener("click", function () {
        let isValid = true;
        let reviewText = "<h3>Review Your Information:</h3>";

        // Validate First Name
        const fnameInput = document.getElementById("fname");
        const fnameError = document.getElementById("name-error");
        if (fnameInput.value.trim() === "") {
            fnameError.textContent = "First name is required.";
            isValid = false;
        } else {
            fnameError.textContent = "";
            reviewText += `<p><strong>First Name:</strong> ${fnameInput.value}</p>`;
        }

        // Validate Last Name
        const lnameInput = document.getElementById("lname");
        if (lnameInput.value.trim() !== "") {
            reviewText += `<p><strong>Last Name:</strong> ${lnameInput.value}</p>`;
        }

        // Validate Email
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Enter a valid email.";
            isValid = false;
        } else {
            emailError.textContent = "";
            reviewText += `<p><strong>Email:</strong> ${emailInput.value}</p>`;
        }

        // Gender
        const gender = document.querySelector('input[name="pgender"]:checked');
        if (gender) {
            reviewText += `<p><strong>Gender:</strong> ${gender.value}</p>`;
        }

        // Date of Birth
        const dobInput = document.getElementById("dob");
        if (dobInput.value) {
            reviewText += `<p><strong>Date of Birth:</strong> ${dobInput.value}</p>`;
        }

        // Pain Level
        const painInput = document.getElementById("painRange");
        reviewText += `<p><strong>Pain Level:</strong> ${painInput.value}/10</p>`;

        // Username
        const uidInput = document.getElementById("uid");
        if (uidInput.value.trim() !== "") {
            reviewText += `<p><strong>Username:</strong> ${uidInput.value}</p>`;
        }

        // Validate Password
        const passwordInput = document.getElementById("pword");
        const passwordError = document.getElementById("password-error");
        if (passwordInput.value.length < 10) {
            passwordError.textContent = "Password must be at least 10 characters.";
            isValid = false;
        } else {
            passwordError.textContent = "";
            reviewText += `<p><strong>Password:</strong> [Hidden for security]</p>`;
        }

        // Show review output if valid
        if (isValid) {
            reviewContent.innerHTML = reviewText;
            reviewModal.style.display = "block";
        }
    });

    // Close the modal
    closeModal.addEventListener("click", function () {
        reviewModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === reviewModal) {
            reviewModal.style.display = "none";
        }
    });
});
