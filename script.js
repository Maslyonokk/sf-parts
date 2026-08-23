async function loadPartsJSON() {
    const response = await fetch("convertcsv.json");
    console.log("fetching data.json")
    const partsArray = await response.json();
    console.log("finished data.json")
    
    addPartCards(partsArray)

    
    // const partsDisplay = document.getElementById('parts')

    // partsDisplay.innerHTML = ``
    // for (let i of partsArray){
    //     partsDisplay.innerHTML += 
            // `
            // <div class="part-card" id="${i.SKU}">
            //             <img src="${i.img}">
            //             <p class="part-name">${i.name}</p>
            //             <p class="sku-number">${i.SKU}</p>
            //         </div>
            // `
    // }

    // addEventListeners()
}

loadPartsJSON()
//addPartCards()

const testField = document.getElementById('test-field')
const outputTextField = document.getElementById('output-text-field')
const copyButton = document.getElementById('copy-button')
const clearButton = document.getElementById('clear-button')

const partsMostUsed = document.getElementById('parts-most-used')
const partsWheel = document.getElementById('parts-wheel')
const partsBrakes = document.getElementById('parts-brakes')
const partsFenders = document.getElementById('parts-fenders')
const partsDrivetrain = document.getElementById('parts-drivetrain')
const partsGears = document.getElementById('parts-gears')
const partsChainguard = document.getElementById('parts-chainguard')




let selectedCodes = []

function addPartCards(allPartsArray){
    for (let i of allPartsArray){
        //Checking for most used separately from the switch statement is intentional. This allows a part to appear in both MostUsed section and its own part category
        //Temporarily parts are not duplicated in their own categories because that leads to unforeseen behavior
        if (i.mostUsed){
            partsMostUsed.innerHTML+=
                    `
                    <div class="part-card" id="${i.SKU}">
                        <img src="${i.img}">
                        <p class="part-name">${i.name}</p>
                        <p class="sku-number">${i.SKU}</p>
                    </div>
                    `;
        } else {
            switch (i.partCategory){
                case "Wheel":
                    partsWheel.innerHTML+=
                        `
                        <div class="part-card" id="${i.SKU}">
                            <img src="${i.img}">
                            <p class="part-name">${i.name}</p>
                            <p class="sku-number">${i.SKU}</p>
                        </div>
                        `;
                    break;
                case "Brakes":
                    partsBrakes.innerHTML+=
                        `
                        <div class="part-card" id="${i.SKU}">
                            <img src="${i.img}">
                            <p class="part-name">${i.name}</p>
                            <p class="sku-number">${i.SKU}</p>
                        </div>
                        `;
                    break;
                case "Fenders":
                    partsFenders.innerHTML+=
                        `
                        <div class="part-card" id="${i.SKU}">
                            <img src="${i.img}">
                            <p class="part-name">${i.name}</p>
                            <p class="sku-number">${i.SKU}</p>
                        </div>
                        `;
                    break;
                case "Drivetrain":
                    partsDrivetrain.innerHTML+=
                        `
                        <div class="part-card" id="${i.SKU}">
                            <img src="${i.img}">
                            <p class="part-name">${i.name}</p>
                            <p class="sku-number">${i.SKU}</p>
                        </div>
                        `;
                    break;
                case "Gears":
                    partsGears.innerHTML+=
                        `
                        <div class="part-card" id="${i.SKU}">
                            <img src="${i.img}">
                            <p class="part-name">${i.name}</p>
                            <p class="sku-number">${i.SKU}</p>
                        </div>
                        `;
                    break;
                case "Chainguard":
                    partsChainguard.innerHTML+=
                        `
                        <div class="part-card" id="${i.SKU}">
                            <img src="${i.img}">
                            <p class="part-name">${i.name}</p>
                            <p class="sku-number">${i.SKU}</p>
                        </div>
                        `;
                    break;
        }

        }
        
    
    }
    addEventListeners()

}


copyButton.addEventListener('click', function(){
    navigator.clipboard.writeText(outputTextField.textContent)
})

clearButton.addEventListener('click', function(){
    const partCards = document.getElementsByClassName('part-card')
    for (let card of partCards){
        card.classList.remove('highlight')
    }  //removign highlight from all cards
    selectedCodes = [] //emptying arrays of codes of selected cards
    outputAllSKU() //writing all currently selected codes (which should be none)
    console.log("Selected codes: ", selectedCodes)

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
    //this if-elif makes sure that it doesn't matter whether the user clicks on an element within the card or on the background
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

// addEventListeners()

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

