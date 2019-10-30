// set the counter 
let counter = document.getElementById("counter")

// Increase the like count by one for this number
function likeCounterIncrement() {

    let numCounter = parseInt(counter.innerText)
    let ul = document.getElementsByClassName('likes')[0]
    let li = ul.querySelector(`[data-id="${numCounter}"]`)
    
    if (li) {
        let currentCount = parseInt(li.dataset.count)
        li.dataset.count = ++currentCount
        li.innerText = `${li.dataset.id} has been like ${li.dataset.count} time(s)`
    } else {
        li = document.createElement("li")
        li.dataset.id = numCounter
        li.dataset.count = 1
        li.innerText = `${li.dataset.id} has been like ${li.dataset.count} time(s)` 
        ul.appendChild(li)
    }
}   

// Increment the counter by one
function numCounterAdjuster (math = "plus") {
    let numCounter = parseInt(counter.innerText)
    if(math === "plus"){
        numCounter++
    }else if(math == "minus" && numCounter > 0){
        numCounter--
    }   
    counter.innerText = numCounter
}

// Set the automatic increment
let interval = window.setInterval(numCounterAdjuster, 1000)

// Find and save the buttons we have to pause
let minusButton = document.getElementById('minus')
let plusButton = document.getElementById('plus')
let heartButton = document.getElementById('heart')
let submitButton = document.getElementById('submit')

let theButtons = [minusButton, plusButton, heartButton, submitButton]

function toggleButtons(){
    theButtons.forEach(function(button){
        button.disabled = !button.disabled
    })

}

// Add a click listener for the body
document.body.addEventListener('click', function (e) {

    if (e.target.id === 'minus') {
        numCounterAdjuster('minus')
    } else if (e.target.id === 'plus') {
        numCounterAdjuster()
    } else if (e.target.id === 'heart') {
        likeCounterIncrement()
    }

    //If pause, diable all buttons and change pause
    // button to reset button
    if (e.target.id === 'pause') {

        //flip the buttons status
        toggleButtons()

        window.clearInterval(interval)
        e.target.id = 'resume'
        e.target.innerText = 'resume'

    // If reset, enable all buttons and 
    // change button to pause
    } else if (e.target.id === 'resume') {
        toggleButtons()
        interval = window.setInterval(numCounterIncrementer, 1000)
        e.target.id = 'pause'
        e.target.innerText = 'pause'
    } 
})

// Find and save the form tag
let form = document.getElementById('comment-form')

// When form submitted...
form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Grab the comment text and store in the p tag
    let commentText = e.target[0].value
    let p = document.createElement("p")
    p.innerText = commentText

    // Add the p tag to the comments list
    let list = document.getElementById('list')
    list.appendChild(p)
    e.target[0].value = ""
})