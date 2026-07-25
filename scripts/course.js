const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming.', technology: [ 'Python' ], completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web.', technology: [ 'HTML', 'CSS' ], completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'Students become more proficient Python programmers.', technology: [ 'Python' ], completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of classes and objects.', technology: [ 'C#' ], completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience with HTML, CSS, and JS.', technology: [ 'HTML', 'CSS', 'JS' ], completed: false },
    { subject: 'ITM', number: 111, title: 'Introduction to Databases', credits: 3, certificate: 'Web and Computer Programming', description: 'This course introduces database design and management.', technology: [ 'MySQL' ], completed: true }
];

const courseContainer = document.getElementById('course-list');
const totalCreditsDisplay = document.getElementById('total-credits');
// FIX 3: Select your HTML <dialog> element (make sure your HTML dialog has id="course-details")
const courseDetails = document.getElementById('course-details'); 

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        
        courseCard.textContent = `${course.subject} ${course.number}`;
        courseCard.classList.add('course-card');

        if (course.completed === true) {
            courseCard.classList.add('completed');
        }

        // FIX 2: Add the click event listener INSIDE the loop building each card
        courseCard.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  
  courseDetails.showModal();
  
  // FIX 1: Select the close button AFTER it has been injected into the DOM
  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

// Close modal when clicking outside of it (on the backdrop)
courseDetails.addEventListener('click', (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});

function filterCourses(subject) {
    if (subject === "all") {
        displayCourses(courses);
    } else if (subject === "others") {
        const filtered = courses.filter(course => course.subject !== "CSE" && course.subject !== "WDD");
        displayCourses(filtered);
    } else {
        const filtered = courses.filter(course => course.subject === subject);
        displayCourses(filtered);
    }
}

const btnAll = document.getElementById("all");
const btnCSE = document.getElementById("cse");
const btnWDD = document.getElementById("wdd");
const btnOTH = document.getElementById("others");

if (btnAll) {
    btnAll.addEventListener("click", () => filterCourses("all"));
    btnCSE.addEventListener("click", () => filterCourses("CSE"));
    btnWDD.addEventListener("click", () => filterCourses("WDD"));
    btnOTH.addEventListener("click", () => filterCourses("others"));
}

// Initial render
displayCourses(courses);