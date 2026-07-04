const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: [ 'Python' ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: [ 'HTML', 'CSS' ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more proficient Python programmers.',
        technology: [ 'Python' ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: [ 'C#' ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with HTML, CSS, and JS.',
        technology: [ 'HTML', 'CSS', 'JS' ],
        completed: false
    },
    {
        subject: 'ITM',
        number: 111,
        title: 'Introduction to Databases',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces database design and management.',
        technology: [ 'MySQL' ],
        completed: true
    }
];

const courseContainer = document.getElementById('course-list');
const totalCreditsDisplay = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        
        courseCard.textContent = `${course.subject} ${course.number}`;
        
        courseCard.classList.add('course-card');

        if (course.completed === true) {
            courseCard.classList.add('completed');
        }

        courseContainer.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}

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
