const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'За какво служи PowerPoint?',
        choice1: 'За създаване на презентации',
        choice2: 'За създаване на 3D проекти',
        choice3: 'За създаване на Видео игри',
        choice4: 'За Рисуване',
        answer: 1,
    },
    {
        question: "Коя опция я  в първоначалното меню на PowerPoint 365?",
        choice1: "Home",
        choice2: "New",
        choice3: "Open",
        choice4: "Create",
        answer: 4,
    },
    {
        question: "Кое НE е вярно за създаването на Слайд?",
        choice1: "Може да бъде създаден празен слайд(бял лист)",
        choice2: "Можеш да си избереш layout по твое желание",
        choice3: "Не можеш да променяш layout-а след като вече си го избрал",
        choice4: "Можеш да добяваш текст от менюто insert",
        answer: 3,
    },
    {
        question: "Кое от тези твърдения е вярно?",
        choice1: "В PowerPoint можеш да вкараш .exe файл",
        choice2: "В PowerPoint можеш да вкараш видео",
        choice3: "В PowerPoint не можеш да вкараш звук",
        choice4: "В PowerPoint не можеш да вкарваш повече от 1 снимка на слайд",
        answer: 2,
    },
    {
        question: "Кое твърдение за Slide Show НЕ е вярно?",
        choice1: "По време на Slide Show можеш да рисуваш",
        choice2: "По време на Slide Show можеш да връщаш слайдовете назад",
        choice3: "По време на Slide Show можеш да отидеш на който си slide искаш",
        choice4: "По време на Slide Show можеш да променяш презентацията",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.href = "end.html"
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()