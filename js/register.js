/* =========================================================
   TECHNOVA 1.0
   REGISTRATION PAGE - COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   1. BACKGROUND NETWORK ANIMATION
========================================================= */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let canvasWidth;
let canvasHeight;
let particles = [];


/* Resize Canvas */

function resizeCanvas() {

    const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;

    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    createParticles();
}


/* Particle */

class Particle {

    constructor() {

        this.x =
            Math.random() * canvasWidth;

        this.y =
            Math.random() * canvasHeight;

        this.vx =
            (Math.random() - 0.5) * 0.18;

        this.vy =
            (Math.random() - 0.5) * 0.18;

        this.radius =
            Math.random() * 1.2 + 0.4;
    }


    update() {

        this.x += this.vx;
        this.y += this.vy;


        if (
            this.x <= 0 ||
            this.x >= canvasWidth
        ) {

            this.vx *= -1;
        }


        if (
            this.y <= 0 ||
            this.y >= canvasHeight
        ) {

            this.vy *= -1;
        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(30, 235, 210, 0.65)";

        ctx.fill();
    }
}


/* Create Particles */

function createParticles() {

    particles = [];

    const mobile =
        window.innerWidth <= 768;

    const count =
        mobile ? 28 : 55;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );
    }
}


/* Connect Particles */

function connectParticles() {

    const distanceLimit =
        window.innerWidth <= 768
            ? 95
            : 135;


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                distanceLimit
            ) {

                const opacity =

                    (
                        1 -
                        distance /
                        distanceLimit
                    ) * 0.14;


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(22, 220, 210, ${opacity})`;

                ctx.lineWidth =
                    0.7;

                ctx.stroke();
            }

        }

    }

}


/* Animation */

function animateBackground() {

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );


    connectParticles();


    requestAnimationFrame(
        animateBackground
    );
}


/* Resize */

window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

animateBackground();



/* =========================================================
   2. GET FORM ELEMENTS
========================================================= */

const form =
    document.getElementById(
        "registrationForm"
    );


const nameInput =
    document.getElementById(
        "name"
    );


const mobileInput =
    document.getElementById(
        "mobile"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const qualificationInputs =
    document.querySelectorAll(
        'input[name="qualification"]'
    );


const departmentSelect =
    document.getElementById(
        "department"
    );


const customDepartmentBox =
    document.getElementById(
        "customDepartmentBox"
    );


const customDepartment =
    document.getElementById(
        "customDepartment"
    );


const yearSelect =
    document.getElementById(
        "year"
    );


const customYearBox =
    document.getElementById(
        "customYearBox"
    );


const customYear =
    document.getElementById(
        "customYear"
    );


const submitButton =
    document.getElementById(
        "registerSubmit"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );



/* =========================================================
   3. MOBILE NUMBER - NUMBERS ONLY
========================================================= */

mobileInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .replace(/\D/g, "")
                .slice(0, 10);

    }
);



/* =========================================================
   4. QUALIFICATION → YEAR OPTIONS
========================================================= */

function updateYearOptions(
    qualification
) {

    /*
       Reset custom year
    */

    hideCustomYear();


    /*
       Enable Year Dropdown
    */

    yearSelect.disabled = false;


    /*
       UG
    */

    if (
        qualification === "UG"
    ) {

        yearSelect.innerHTML = `

            <option value="">
                Select your year
            </option>

            <option value="1st Year">
                1st Year
            </option>

            <option value="2nd Year">
                2nd Year
            </option>

            <option value="3rd Year">
                3rd Year
            </option>

            <option value="Other">
                Other
            </option>

        `;

    }


    /*
       PG
    */

    else if (
        qualification === "PG"
    ) {

        yearSelect.innerHTML = `

            <option value="">
                Select your year
            </option>

            <option value="1st Year">
                1st Year
            </option>

            <option value="2nd Year">
                2nd Year
            </option>

            <option value="Other">
                Other
            </option>

        `;

    }


    /*
       Nothing selected
    */

    else {

        yearSelect.innerHTML = `

            <option value="">
                Select qualification first
            </option>

        `;

        yearSelect.disabled =
            true;

    }

}



/* Listen UG / PG */

qualificationInputs.forEach(
    input => {

        input.addEventListener(
            "change",
            function () {

                updateYearOptions(
                    this.value
                );

            }
        );

    }
);



/* =========================================================
   5. DEPARTMENT → OTHER
========================================================= */

departmentSelect.addEventListener(
    "change",
    function () {

        if (
            this.value === "Other"
        ) {

            customDepartmentBox
                .classList
                .add("show");


            customDepartment.required =
                true;


            setTimeout(
                function () {

                    customDepartment.focus();

                },
                200
            );

        }

        else {

            hideCustomDepartment();

        }

    }
);



function hideCustomDepartment() {

    customDepartmentBox
        .classList
        .remove("show");


    customDepartment.required =
        false;


    customDepartment.value =
        "";

}



/* =========================================================
   6. YEAR → OTHER
========================================================= */

yearSelect.addEventListener(
    "change",
    function () {

        if (
            this.value === "Other"
        ) {

            customYearBox
                .classList
                .add("show");


            customYear.required =
                true;


            setTimeout(
                function () {

                    customYear.focus();

                },
                200
            );

        }

        else {

            hideCustomYear();

        }

    }
);



function hideCustomYear() {

    customYearBox
        .classList
        .remove("show");


    customYear.required =
        false;


    customYear.value =
        "";

}



/* =========================================================
   7. PAGE INITIAL STATE
========================================================= */

/*
   This fixes browser auto-restore.

   Sometimes Chrome remembers that UG
   was previously selected after refresh.
*/

function initializeAcademicFields() {

    const selectedQualification =
        document.querySelector(
            'input[name="qualification"]:checked'
        );


    if (
        selectedQualification
    ) {

        updateYearOptions(
            selectedQualification.value
        );

    }

    else {

        yearSelect.disabled =
            true;

        yearSelect.innerHTML = `

            <option value="">
                Select qualification first
            </option>

        `;

    }


    /*
       Check Department
    */

    if (
        departmentSelect.value ===
        "Other"
    ) {

        customDepartmentBox
            .classList
            .add("show");

        customDepartment.required =
            true;

    }

    else {

        hideCustomDepartment();

    }

}


initializeAcademicFields();



/* =========================================================
   8. FORM SECTIONS ENTRANCE
========================================================= */

const formSections =
    document.querySelectorAll(
        ".form-section"
    );


formSections.forEach(
    function (
        section,
        index
    ) {

        section.style.animationDelay =
            `${index * 0.15}s`;

    }
);



/* =========================================================
   9. ERROR MESSAGE
========================================================= */

function showError(message) {

    formMessage.textContent =
        message;


    formMessage.classList.add(
        "show"
    );


    formMessage.scrollIntoView({

        behavior:
            "smooth",

        block:
            "center"

    });


    setTimeout(
        function () {

            formMessage
                .classList
                .remove("show");

        },
        4000
    );

}



/* =========================================================
   10. RESET SUBMIT BUTTON
========================================================= */

function resetSubmitButton() {

    submitButton.disabled =
        false;


    submitButton.classList.remove(
        "loading"
    );


    submitButton.innerHTML = `

        <span>
            COMPLETE REGISTRATION
        </span>

        <span class="submit-arrow">
            →
        </span>

    `;

}



/* =========================================================
   11. GOOGLE APPS SCRIPT URL
========================================================= */

const SCRIPT_URL =

    "https://script.google.com/macros/s/AKfycbwI8JA7sxuAdrCXUK0M5h1Jtj3cMZfjLvW77LDIJDRjTxTXgJIicCJ_WDwnf_zAfqWo/exec";



/* =========================================================
   12. FORM SUBMISSION
========================================================= */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /*
           Clear previous error
        */

        formMessage.textContent =
            "";

        formMessage.classList.remove(
            "show"
        );


        /* =========================
           GET VALUES
        ========================= */

        const name =
            nameInput.value.trim();


        const mobile =
            mobileInput.value.trim();


        const email =
            emailInput.value.trim();


        const qualification =
            document.querySelector(
                'input[name="qualification"]:checked'
            );


        const selectedEvent =
            document.querySelector(
                'input[name="event"]:checked'
            );



        /* =========================
           NAME VALIDATION
        ========================= */

        if (
            name.length < 3
        ) {

            showError(
                "Please enter your full name."
            );

            nameInput.focus();

            return;
        }



        /* =========================
           MOBILE VALIDATION
        ========================= */

        const mobilePattern =
            /^[6-9][0-9]{9}$/;


        if (
            !mobilePattern.test(
                mobile
            )
        ) {

            showError(
                "Please enter a valid 10-digit mobile number."
            );

            mobileInput.focus();

            return;
        }



        /* =========================
           EMAIL VALIDATION
        ========================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                email
            )
        ) {

            showError(
                "Please enter a valid email address."
            );

            emailInput.focus();

            return;
        }



        /* =========================
           QUALIFICATION
        ========================= */

        if (
            !qualification
        ) {

            showError(
                "Please select UG or PG."
            );

            return;
        }



        /* =========================
           DEPARTMENT
        ========================= */

        if (
            !departmentSelect.value
        ) {

            showError(
                "Please select your department."
            );

            departmentSelect.focus();

            return;
        }



        /*
           Custom Department
        */

        if (
            departmentSelect.value ===
            "Other"
        ) {

            if (
                customDepartment
                    .value
                    .trim()
                    .length < 2
            ) {

                showError(
                    "Please enter your department."
                );

                customDepartment.focus();

                return;
            }

        }



        /* =========================
           YEAR
        ========================= */

        if (
            !yearSelect.value
        ) {

            showError(
                "Please select your year."
            );

            yearSelect.focus();

            return;
        }



        /*
           Custom Year
        */

        if (
            yearSelect.value ===
            "Other"
        ) {

            if (
                customYear
                    .value
                    .trim()
                    .length < 2
            ) {

                showError(
                    "Please enter your year."
                );

                customYear.focus();

                return;
            }

        }



        /* =========================
           EVENT
        ========================= */

        if (
            !selectedEvent
        ) {

            showError(
                "Please select an event."
            );

            return;
        }



        /* =================================================
           FINAL DEPARTMENT
        ================================================= */

        const finalDepartment =

            departmentSelect.value ===
            "Other"

                ? customDepartment
                    .value
                    .trim()

                : departmentSelect
                    .value;



        /* =================================================
           FINAL YEAR
        ================================================= */

        const finalYear =

            yearSelect.value ===
            "Other"

                ? customYear
                    .value
                    .trim()

                : yearSelect
                    .value;



        /* =================================================
           PREPARE GOOGLE SHEET DATA
        ================================================= */

        const registrationData = {

            name:
                name,

            mobile:
                mobile,

            email:
                email,

            qualification:
                qualification.value,

            department:
                finalDepartment,

            year:
                finalYear,

            event:
                selectedEvent.value

        };


        console.log(
            "TECHNOVA Registration:",
            registrationData
        );



        /* =================================================
           LOADING BUTTON
        ================================================= */

        submitButton.disabled =
            true;


        submitButton.classList.add(
            "loading"
        );


        submitButton.innerHTML = `

            <span class="loader"></span>

            <span>
                PROCESSING REGISTRATION
            </span>

        `;



        /* =================================================
           SEND TO GOOGLE SHEETS
        ================================================= */

        fetch(
            SCRIPT_URL,
            {

                method:
                    "POST",

                body:
                    JSON.stringify(
                        registrationData
                    )

            }
        )


        .then(
            function (response) {

                if (
                    !response.ok
                ) {

                    throw new Error(
                        "Server request failed"
                    );

                }


                return response.json();

            }
        )


        .then(
            function (data) {

                console.log(
                    "Google Sheet Response:",
                    data
                );


                if (
                    data.status ===
                    "success"
                ) {

                    /*
                       Registration successful
                    */

                    window.location.href =
                        "success.html";

                }

                else {

                    throw new Error(

                        data.message ||

                        "Registration failed"

                    );

                }

            }
        )


        .catch(
            function (error) {

                console.error(
                    "Registration Error:",
                    error
                );


                resetSubmitButton();


                showError(
                    "Registration failed. Please try again."
                );

            }
        );

    }
);