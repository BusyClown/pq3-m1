const questions = [
    {
        question: 'Quellaveco es la ... del Perú.',
        answers: [
            { text: 'Primera mina digital', correct: true },
            { text: 'Mina más grande', correct: false },
            { text: 'Mayor operación minera', correct: false }
        ]
    },
    {
        question: 'Comunidades conectadas ...',
        answers: [
            { text: 'Lleva telefonía móvil e internet a las comunidades.', correct: true },
            { text: 'Construye pistas y veredas.', correct: false },
            { text: 'Entrega computadoras a la población.', correct: false },
        ]
    },
    {
        question: 'Los tipos de energía renovable que usamos son:',
        answers: [
            { text: 'Eólica y solar', correct: true },
            { text: 'Geotérmica y solar', correct: false },
            { text: 'Nuclear y magnética', correct: false }
        ]
    },
    {
        question: 'En Quellaveco hemos desarrollado ... del país.',
        answers: [
            { text: 'La primera generación de mineros digitales', correct: true },
            { text: 'Los mejores camiones mineros convencionales', correct: false },
            { text: 'Los más grandes radares y drones', correct: false }
        ]
    }
];

const startButton          = document.getElementById('start-btn');
const questionContainer    = document.getElementById('question-container');
const questionElement      = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement         = document.getElementById('score');
const nextButton           = document.getElementById('next-btn');
const rptButton            = document.getElementById('rpt-btn');
const resetButton          = document.getElementById('reset-btn');
const msgScore             = document.getElementById("msg-score");
const regresarButton       = document.getElementById("rpt-close");


let shuffledQuestions;
let currentQuestionIndex;
let score;
let rptCorrect = false;





document.addEventListener(
    "DOMContentLoaded", function() {
        showScreen(1);
    }
);

startButton.addEventListener(
    "click", function() {
        showScreen(2);
        startGame();

    }
);

nextButton.addEventListener(
    "click", function() {
        if (rptCorrect) {
            score++;
            rptCorrect = false;
        }

        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            
            endGame();
            showScreen(5);
            if (score == 0) {
                msgCongratulation("Intentalo otra vez");
            } else if (score > 0 && score < 4) {
                msgCongratulation("Puedes mejorar");
            } else if (score == 4) {
                msgCongratulation("¡LO LOGRASTE!")
            }
        } 
    }
)

//
regresarButton.addEventListener(
    "click", function() {
        showScreen(3);
    }
)


rptButton.addEventListener(
    "click", function() {
        showScreen(4);
    }
)

resetButton.addEventListener(
    "click", function() {
        location.reload();
    }
)

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    hiddenNextBtn();
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    myAnim ();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.sort(() => Math.random() - 0.5).forEach(
        answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
        
            answerButtonsElement.appendChild(button);
        }
    );
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    stylesDefault()
    this.style.backgroundColor = "aquamarine";
    if (correct) {
        rptCorrect = true;
    } else {
        rptCorrect = false;
    }
    showNextBtn();
}

function endGame() {
    
    const finalScoreInput = document.getElementById("finalScore");
console.log("Elemento finalScoreInput:", finalScoreInput); // Debe mostrar el elemento <input>
console.log("Valor del puntaje (score):", score); // Debe mostrar el número o texto esperado
finalScoreInput.value = score; // Asegúrate de asignar el valor, no el elemento
console.log("Valor asignado:", finalScoreInput.value); // Confirmar el valor asignado

    scoreElement.innerText = score;
}

function hiddenNextBtn() {
    document.querySelectorAll('.next-btn').forEach(
        function(elemento) {
            elemento.style.display = 'none';
        }
    );
}

function showNextBtn() {
    document.getElementById('next-btn').style.display = 'block';
}

function myAnim() {
    const elemento = document.getElementById("app");
    elemento.classList.remove("app");setTimeout(() => {
        elemento.classList.add("app");
    }, 0);
}

function stylesDefault() {
    const botones = document.querySelectorAll('.btn');
    botones.forEach(boton => {
        boton.style.backgroundColor = "white";
    });
}

function msgCongratulation (myMessage) {
    msgScore.innerText = myMessage;
}

// function PantallaCompleta () {
    
//     const elem = document.documentElement;


//     if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) { // Firefox
//         elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) { // Chrome, Safari y Opera
//         elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) { // Internet Explorer/Edge
//         elem.msRequestFullscreen();
//     }
// }

document.getElementById('regForm').addEventListener(
    'submit',
    function(e) {

        e.preventDefault();

        const dni           = document.getElementById("dni").value;
        const puntaje       = document.getElementById("finalScore").value;

        // const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScZnJW2-pnDDRpOOlnNxM6D4yaEUFbCZRWKtMDSvjrXVsUkHw/formResponse";
        const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe5VScLqqwjZCIBF0Wr2_JtgiH5ROrZsGB6Oqaz1FnwgFUnxA/formResponse";

        const formData = new FormData();

        formData.append("entry.1765513746", dni);
        formData.append("entry.1483852479", puntaje);

        fetch(
            googleFormUrl, {
                method: "POST",
                mode: "no-cors",
                body: formData
            }
        )

        // document.getElementById("registrationForm").reset();
        showScreen(3);
    }
);