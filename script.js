let studentName = "Amina Wanjiku";
let registrationNumber = "CS/2023/001";
let academicProgramme = "Bachelor of Science in Computer Science";

console.log("Student Name: " + studentName);
console.log("Registration Number: " + registrationNumber);
console.log("Academic Programme: " + academicProgramme);

function calculateGrade(score) {
    if (typeof score !== "number" || isNaN(score) || score < 0 || score > 100) {
        return "Invalid score";
    }

    if (score >= 70) {
        return "A";
    } else if (score >= 60) {
        return "B";
    } else if (score >= 50) {
        return "C";
    } else if (score >= 40) {
        return "D";
    } else {
        return "E";
    }
}

let examScore = 75;
let grade = calculateGrade(examScore);
alert("Examination score: " + examScore + "\nGrade: " + grade);

const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");
const registrationResult = document.getElementById("registrationResult");

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

function isValidEmail(email) {
    return emailPattern.test(email);
}

function validateRegistration(data) {
    const errors = [];

    if (data.fullName === "") {
        errors.push("Full name is required.");
    }
    if (data.regNo === "") {
        errors.push("Registration number is required.");
    }

    if (data.email === "") {
        errors.push("Email address is required.");
    } else if (!isValidEmail(data.email)) {
        errors.push("Please enter a valid email address (e.g. name@example.com).");
    }

    if (data.gender === "") {
        errors.push("Please select a gender.");
    }
    if (data.programme === "") {
        errors.push("Please select an academic programme.");
    }

    return errors;
}

function clearMessages() {
    formMessage.className = "";
    formMessage.innerHTML = "";
    registrationResult.innerHTML = "";
}

function showErrors(errors) {
    formMessage.className = "message error";

    const intro = document.createElement("strong");
    intro.textContent = "Please correct the following:";
    formMessage.appendChild(intro);

    const list = document.createElement("ul");
    errors.forEach(function (error) {
        const item = document.createElement("li");
        item.textContent = error;
        list.appendChild(item);
    });
    formMessage.appendChild(list);
}

function showSuccess(fullName) {
    formMessage.className = "message success";
    formMessage.textContent = "Registration successful! Thank you, " + fullName + ".";
}

function showSubmittedDetails(fullName, regNo) {
    const box = document.createElement("div");
    box.className = "details";

    const heading = document.createElement("h3");
    heading.textContent = "Submitted Details";
    box.appendChild(heading);

    [["Student Name: ", fullName], ["Registration Number: ", regNo]].forEach(function (pair) {
        const line = document.createElement("p");
        const label = document.createElement("strong");
        label.textContent = pair[0];
        line.appendChild(label);
        line.appendChild(document.createTextNode(pair[1]));
        box.appendChild(line);
    });

    registrationResult.appendChild(box);
}

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessages();

    const fullName = document.getElementById("fullname").value.trim();
    const regNo = document.getElementById("regno").value.trim();
    const email = document.getElementById("email").value.trim();
    const genderInput = registrationForm.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : "";
    const programme = document.getElementById("programme").value;

    const errors = validateRegistration({
        fullName: fullName,
        regNo: regNo,
        email: email,
        gender: gender,
        programme: programme
    });

    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    showSubmittedDetails(fullName, regNo);
    showSuccess(fullName);
});

registrationForm.addEventListener("reset", clearMessages);