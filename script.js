const testField = document.getElementById('test-field')
const outputTextField = document.getElementById('output-text-field')
const copyButton = document.getElementById('copy-button')

let selectedCodes = []


copyButton.addEventListener('click', function(){
    navigator.clipboard.writeText(outputTextField.textContent)
})

function addEventListeners() {
    const partCards = document.getElementsByClassName('part-card')
    for (let card of partCards){
        card.addEventListener('click', toggleCard)
    }
    console.log("addEventListeners ran")
}

function toggleCard(e){
    // document.getElementById(e.target.id).classList.add('highlight')
    //this if-elif makes sure that it doesn't matter whether the user clicks on an element withing the card or on the background
    if (e.target.id){
        document.getElementById(e.target.id).classList.toggle('highlight')
        console.log("toggleCard no parent")
        addOrRemoveSKU(e.target.id)
    } 
    else if (e.target.parentElement.id){
        document.getElementById(e.target.parentElement.id).classList.toggle('highlight')
        console.log("toggleCard yes parent")
        addOrRemoveSKU(e.target.parentElement.id)
    }
    
    outputAllSKU()
    console.log(e.target.id)
    console.log(e.target.parentElement.id)
    console.log("toggleCard ran")
}

addEventListeners()

function addOrRemoveSKU(code){
    if (selectedCodes.includes(code)){
        console.log("Removing a code")
        console.log(selectedCodes)
        let position = selectedCodes.indexOf(code)
        selectedCodes.splice(position, 1)
        console.log(selectedCodes)
    } else {
        selectedCodes.push(code)
    }
    
}

function outputAllSKU(){
    outputTextField.textContent = null
    for (let i=0; i<selectedCodes.length; i++){
        outputTextField.textContent += selectedCodes[i] + "\n" //codes are still displayed in a line, but copying them with the copy button gets them with line breaks (which is what we want). Manually highlighting still copies it in one line though. If it proves to be a problem in testing I'll just disable highlighting 
    }
}

