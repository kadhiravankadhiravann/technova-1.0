/* =========================================
   TECHNOVA 1.0
   INTERACTIVE NEURAL NETWORK BACKGROUND
========================================= */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;

let particles = [];

let mouse = {
    x: null,
    y: null
};


/* =========================================
   DEVICE CHECK
========================================= */

function isMobile() {

    return window.innerWidth <= 768;

}


/* =========================================
   CANVAS SIZE
========================================= */

function resizeCanvas() {

    const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

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


/* =========================================
   PARTICLE CLASS
========================================= */

class Particle {

    constructor() {

        this.reset();

    }


    reset() {

        this.x =
            Math.random() * width;

        this.y =
            Math.random() * height;


        /*
        Slower movement = premium look.
        */

        this.vx =
            (Math.random() - 0.5) * 0.35;

        this.vy =
            (Math.random() - 0.5) * 0.35;


        this.radius =
            Math.random() * 1.3 + 0.7;


        this.pulse =
            Math.random() * Math.PI * 2;

    }


    update() {

        this.x += this.vx;

        this.y += this.vy;


        /*
        Bounce from screen edges
        */

        if (
            this.x <= 0 ||
            this.x >= width
        ) {

            this.vx *= -1;

        }


        if (
            this.y <= 0 ||
            this.y >= height
        ) {

            this.vy *= -1;

        }


        /*
        Desktop mouse interaction
        */

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx =
                mouse.x - this.x;

            const dy =
                mouse.y - this.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 150) {

                const force =
                    (150 - distance) / 150;

                this.x -=
                    dx * force * 0.008;

                this.y -=
                    dy * force * 0.008;

            }

        }


        this.pulse += 0.025;

    }


    draw() {

        const pulseSize =

            this.radius +

            Math.sin(
                this.pulse
            ) * 0.35;


        ctx.beginPath();

        ctx.arc(

            this.x,
            this.y,

            Math.max(
                pulseSize,
                0.4
            ),

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            "rgba(87, 190, 255, 0.8)";

        ctx.fill();


        /*
        Node glow
        */

        ctx.beginPath();

        ctx.arc(

            this.x,
            this.y,

            5,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            "rgba(79, 124, 255, 0.035)";

        ctx.fill();

    }

}


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles() {

    particles = [];


    /*
    IMPORTANT:

    Mobile gets fewer particles.

    This keeps the animation smooth
    and reduces battery usage.
    */

    const particleCount =

        isMobile()

            ? Math.min(
                38,
                Math.floor(
                    (width * height) / 11000
                )
            )

            : Math.min(
                85,
                Math.floor(
                    (width * height) / 17000
                )
            );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


/* =========================================
   CONNECT PARTICLES
========================================= */

function connectParticles() {

    const connectionDistance =

        isMobile()
            ? 105
            : 140;


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
                connectionDistance
            ) {

                const opacity =

                    1 -
                    distance /
                    connectionDistance;


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

                    `rgba(
                        91,
                        109,
                        255,
                        ${opacity * 0.18}
                    )`;


                ctx.lineWidth =
                    0.6;


                ctx.stroke();

            }

        }

    }

}


/* =========================================
   RANDOM ENERGY PULSE
========================================= */

let energyPulse = {

    active: false,

    start: null,

    end: null,

    progress: 0

};


function createEnergyPulse() {

    if (
        energyPulse.active ||
        particles.length < 2
    ) {

        return;

    }


    const first =

        Math.floor(
            Math.random() *
            particles.length
        );


    let second =

        Math.floor(
            Math.random() *
            particles.length
        );


    if (first === second) {

        second =
            (second + 1) %
            particles.length;

    }


    energyPulse.start =
        particles[first];


    energyPulse.end =
        particles[second];


    energyPulse.progress = 0;

    energyPulse.active = true;

}


/* =========================================
   DRAW ENERGY PULSE
========================================= */

function drawEnergyPulse() {

    if (!energyPulse.active) {

        return;

    }


    energyPulse.progress += 0.012;


    if (
        energyPulse.progress >= 1
    ) {

        energyPulse.active = false;

        return;

    }


    const start =
        energyPulse.start;


    const end =
        energyPulse.end;


    const x =

        start.x +

        (
            end.x -
            start.x
        ) *

        energyPulse.progress;


    const y =

        start.y +

        (
            end.y -
            start.y
        ) *

        energyPulse.progress;


    /*
    Glow
    */

    const gradient =

        ctx.createRadialGradient(

            x,
            y,
            0,

            x,
            y,
            15

        );


    gradient.addColorStop(

        0,
        "rgba(0,234,255,0.9)"

    );


    gradient.addColorStop(

        1,
        "rgba(0,234,255,0)"

    );


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        15,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        gradient;

    ctx.fill();


    /*
    Energy core
    */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        2,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#ffffff";

    ctx.fill();

}


/* =========================================
   ANIMATION
========================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    connectParticles();

    drawEnergyPulse();


    requestAnimationFrame(
        animate
    );

}


/* =========================================
   ENERGY PULSE TIMER
========================================= */

setInterval(
    createEnergyPulse,
    2200
);


/* =========================================
   DESKTOP MOUSE
========================================= */

window.addEventListener(

    "mousemove",

    function(event) {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;

    }

);


window.addEventListener(

    "mouseleave",

    function() {

        mouse.x = null;

        mouse.y = null;

    }

);


/* =========================================
   MOBILE TOUCH
========================================= */

window.addEventListener(

    "touchmove",

    function(event) {

        if (
            event.touches.length > 0
        ) {

            mouse.x =
                event.touches[0].clientX;

            mouse.y =
                event.touches[0].clientY;

        }

    },

    {
        passive: true
    }

);


window.addEventListener(

    "touchend",

    function() {

        mouse.x = null;

        mouse.y = null;

    }

);


/* =========================================
   RESIZE
========================================= */

window.addEventListener(

    "resize",

    resizeCanvas

);


/* =========================================
   ENTER TECHNOVA
========================================= */

const enterBtn =
    document.getElementById(
        "enterBtn"
    );


enterBtn.addEventListener(

    "click",

    function() {

        const buttonText =

            enterBtn.querySelector(
                ".button-text"
            );


        buttonText.textContent =
            "INITIALIZING";


        document.body.style.opacity =
            "0";


        document.body.style.transform =
            "scale(1.03)";


        setTimeout(
            function() {

                window.location.href =
                    "register.html";

            },

            650
        );

    }

);


/* =========================================
   START
========================================= */

resizeCanvas();

animate();