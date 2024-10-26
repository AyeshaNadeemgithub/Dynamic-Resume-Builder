declare var html2pdf: any;

// Event listener for form submission
document.getElementById('resumeForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = (document.getElementById('nameInput') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('jobTitleInput') as HTMLInputElement).value;
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const phone = (document.getElementById('phoneInput') as HTMLInputElement).value;
    const website = (document.getElementById('websiteInput') as HTMLInputElement).value;
    const description = (document.getElementById('descriptionInput') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skillsInput') as HTMLInputElement).value.split(',');
    const hobbies = (document.getElementById('hobbiesInput') as HTMLInputElement).value.split(',');
    const experience = (document.getElementById('experienceInput') as HTMLInputElement).value.split(',');
    const education = (document.getElementById('educationInput') as HTMLInputElement).value.split(',');

    const profilePictureInput = document.getElementById('profilePictureInput') as HTMLInputElement;
    let profilePictureURL = '';

    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePictureURL = e.target?.result as string;
            generateResumeHTML();
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
        generateResumeHTML(); // Call without image if none selected
    }

    function generateResumeHTML() {
        const resumeHTML = `
        <div class="main">
          <div class="container">
            <div class="left-column">
              <div class="profile-picture">
                <img src="${profilePictureURL || 'https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}" alt="Profile Picture" />
              </div>
              
              <div class="profile-side">
                <div class="profile-details">
                  <h2>Profile</h2>
                  <p>${description}</p>
                </div>
                <div class="contact-details">
                  <h2>Contact</h2>
                  <p>Email: ${email}</p>
                  <p>Phone: ${phone}</p>
                  <p>Website: ${website}</p>
                </div>
                <div class="hobbies">
                  <h2>Hobbies</h2>
                  <ul>
                    ${hobbies.map((hobby) => `<li>${hobby.trim()}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="right-column">
              <div class="name-job-title">
                <h1>${name}</h1>
                <p>${jobTitle}</p>
              </div>
              <div class="section">
                <h2>Academic Qualification</h2>
                <ul>
                  ${education.map((edu) => `<li>${edu.trim()}</li>`).join("")}
                </ul>
              </div>
              <div class="section">
                <h2>Work Experience</h2>
                <div class="section2">
                  <ul>
                    ${experience.map((exp) => `<li>${exp.trim()}</li>`).join("")}
                  </ul>
                </div>
              </div>
              <div class="section">
                <h2>Skills</h2>
                <ul>
                  ${skills.map((skill) => `<li>${skill.trim()}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
        `;
        const resumeDiv = document.getElementById('generatedResume');
        if (resumeDiv) {
            resumeDiv.innerHTML = resumeHTML;
        }
    }
});

// Event listener for PDF download
document.getElementById("downloadPDF")?.addEventListener("click", function () {
    const resumeOutputElement = document.getElementById("generatedResume");
    if (resumeOutputElement) {
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(resumeOutputElement).set(opt).save();
    } else {
        console.error("Resume content not found.");
    }
});
