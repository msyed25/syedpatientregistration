// === Utility Functions ===
const get = id => document.getElementById(id);
const showError = (id, msg) => get(id).textContent = msg;
const clearError = id => get(id).textContent = "";

const isAlpha = str => /^[a-zA-Z'\-]+$/.test(str);
const isEmail = str => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
const isPhone = str => /^\d{3}-\d{3}-\d{4}$/.test(str);
const isZip = str => /^\d{5}$/.test(str);
const isValidID = str => /^[a-zA-Z_\-][a-zA-Z0-9_\-]{4,19}$/.test(str);
const isStrongPassword = str => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(str);

// === Live Field Validation ===
function validateField(id, condition, msgId, msg) {
  const val = get(id).value.trim();
  if (!condition(val)) {
    showError(msgId, msg);
    return false;
  } else {
    clearError(msgId);
    return true;
  }
}

// Specific validations
function validateDOB() {
  const val = get("dob").value;
  const dob = new Date(val);
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
  if (!val || dob > today || dob < minDate) {
    showError("dob-error", "Date must be valid and not in the future or older than 120 years.");
    return false;
  }
  clearError("dob-error");
  return true;
}

function validatePID() {
  const val = get("pid").value.replace(/[^\d]/g, "");
  if (val.length !== 9) {
    showError("pid-error", "Must be 9 numeric digits.");
    return false;
  }
  clearError("pid-error");
  return true;
}

function validatePasswords() {
  const pw = get("pword").value;
  const pw2 = get("pword2").value;
  const uid = get("uid").value;
  let valid = true;

  if (!isStrongPassword(pw)) {
    showError("pword-error", "Password must be 8+ chars, include uppercase, lowercase, digit.");
    valid = false;
  } else if (pw === uid) {
    showError("pword-error", "Password cannot match User ID.");
    valid = false;
  } else {
    clearError("pword-error");
  }

  if (pw !== pw2) {
    showError("pword2-error", "Passwords must match.");
    valid = false;
  } else {
    clearError("pword2-error");
  }

  return valid;
}

function validateSalary() {
  const display = get("salary-display");
  const slider = get("salary");
  display.textContent = `$${parseInt(slider.value).toLocaleString()}`;
}

// === Validate All ===
function validateAll() {
  let allGood = true;
  allGood &= validateField("fname", isAlpha, "fname-error", "First name must be 1–30 letters only.");
  allGood &= validateField("lname", isAlpha, "lname-error", "Last name must be 1–30 letters only.");
  allGood &= validateField("mname", v => v === "" || /^[a-zA-Z]$/.test(v), "mname-error", "Middle initial must be 1 letter.");
  allGood &= validateDOB();
  allGood &= validatePID();
  allGood &= validateField("email", isEmail, "email-error", "Invalid email format.");
  allGood &= validateField("phone", isPhone, "phone-error", "Format must be 000-000-0000.");
  allGood &= validateField("addr1", v => v.length >= 2 && v.length <= 30, "addr1-error", "Required: 2–30 characters.");
  allGood &= validateField("addr2", v => v === "" || (v.length >= 2 && v.length <= 30), "addr2-error", "Optional: 2–30 characters.");
  allGood &= validateField("city", v => v.length >= 2, "city-error", "City required.");
  allGood &= validateField("state", v => v !== "", "state-error", "Select a state.");
  allGood &= validateField("zip", isZip, "zip-error", "Zip must be 5 digits.");
  allGood &= validateField("uid", isValidID, "uid-error", "User ID must be 5–20 chars, no spaces, no special characters.");
  allGood &= validatePasswords();
  return !!allGood;
}

// === Event Bindings ===
document.addEventListener("DOMContentLoaded", () => {
  get("salary").addEventListener("input", validateSalary);

  ["fname", "lname", "mname", "email", "phone", "addr1", "addr2", "city", "zip", "uid", "pword", "pword2", "pid"]
    .forEach(id => {
      get(id).addEventListener("blur", validateAll);
      get(id).addEventListener("input", validateAll);
    });

  get("dob").addEventListener("change", validateDOB);
  get("state").addEventListener("change", validateAll);

  get("validate-btn").addEventListener("click", () => {
    const valid = validateAll();
    get("submit-btn").disabled = !valid;
    if (!valid) alert("Please correct the errors before submitting.");
  });
});
