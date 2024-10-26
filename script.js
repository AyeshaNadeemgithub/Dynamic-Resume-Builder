var _a, _b;
// Event listener for form submission
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('nameInput').value;
    var jobTitle = document.getElementById('jobTitleInput').value;
    var email = document.getElementById('emailInput').value;
    var phone = document.getElementById('phoneInput').value;
    var website = document.getElementById('websiteInput').value;
    var description = document.getElementById('descriptionInput').value;
    var skills = document.getElementById('skillsInput').value.split(',');
    var hobbies = document.getElementById('hobbiesInput').value.split(',');
    var experience = document.getElementById('experienceInput').value.split(',');
    var education = document.getElementById('educationInput').value.split(',');
    var profilePictureInput = document.getElementById('profilePictureInput');
    var profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResumeHTML();
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    }
    else {
        generateResumeHTML(); // Call without image if none selected
    }
    function generateResumeHTML() {
        var resumeHTML = "\n        <div class=\"main\">\n          <div class=\"container\">\n            <div class=\"left-column\">\n              <div class=\"profile-picture\">\n                <img src=\"".concat(profilePictureURL || 'https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', "\" alt=\"Profile Picture\" />\n              </div>\n              \n              <div class=\"profile-side\">\n                <div class=\"profile-details\">\n                  <h2>Profile</h2>\n                  <p contenteditable=\"true\">").concat(description, "</p>\n                </div>\n                <div class=\"contact-details\">\n                  <h2>Contact</h2>\n                  <p contenteditable=\"true\">Email: ").concat(email, "</p>\n                  <p contenteditable=\"true\">Phone: ").concat(phone, "</p>\n                  <p contenteditable=\"true\">Website: ").concat(website, "</p>\n                </div>\n                <div class=\"hobbies\">\n                  <h2>Hobbies</h2>\n                  <ul contenteditable=\"true\">\n                    ").concat(hobbies.map(function (hobby) { return "<li>".concat(hobby.trim(), "</li>"); }).join(""), "\n                  </ul>\n                </div>\n              </div>\n            </div>\n            \n            <div class=\"right-column\">\n              <div class=\"name-job-title\">\n                <h1 contenteditable=\"true\">").concat(name, "</h1>\n                <p contenteditable=\"true\">").concat(jobTitle, "</p>\n              </div>\n              <div class=\"section\">\n                <h2>Academic Qualification</h2>\n                <ul contenteditable=\"true\">\n                  ").concat(education.map(function (edu) { return "<li>".concat(edu.trim(), "</li>"); }).join(""), "\n                </ul>\n              </div>\n              <div class=\"section\">\n                <h2>Work Experience</h2>\n                <div class=\"section2\" contenteditable=\"true\">\n                  <ul>\n                    ").concat(experience.map(function (exp) { return "<li>".concat(exp.trim(), "</li>"); }).join(""), "\n                  </ul>\n                </div>\n              </div>\n              <div class=\"section\">\n                <h2>Skills</h2>\n                <ul contenteditable=\"true\">\n                  ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(""), "\n                </ul>\n              </div>\n            </div>\n          </div>\n        </div>\n        ");
        var resumeDiv = document.getElementById('generatedResume');
        if (resumeDiv) {
            resumeDiv.innerHTML = resumeHTML;
        }
    }
});
// Event listener for PDF download
(_b = document.getElementById("downloadPDF")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var resumeOutputElement = document.getElementById("generatedResume");
    if (resumeOutputElement) {
        var opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(resumeOutputElement).set(opt).save();
    }
    else {
        console.error("Resume content not found.");
    }
});
