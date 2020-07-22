const mealApp = {};

mealApp.chosenByUser = [];

mealApp.cookedMeals = {};

mealApp.answers = {
    smoothie: ['banana', 'milk', 'pineapple'],
    orangeJuice: ['orange', 'orange', 'orange'],
}

mealApp.allIngridients = ['banana', 'milk', 'pineapple', 'avocado', 'orange'];


// Filling DOM with available ingridients
mealApp.availableIngridients = function() {
    for (i=0; i < mealApp.allIngridients.length; i++) {
        $('.ingridients').append(`
        <li>
            <button id="remove">Remove</button>
            <p>${mealApp.allIngridients[i]}</p>
            <button id="add">Add</button>
        </li>
        `);
    }
}

// Check if something is cooked based on the chosen ingridients
mealApp.checkIfCooked = function() {

    for (const meals in  mealApp.answers) {
        // console.log(`${meals}: ${mealApp.answers[meals]}`);
        
        if (mealApp.chosenByUser.sort().join(',') === mealApp.answers[meals].sort().join(',')){
            return `We made a ${meals}`;
        }
        // else {
        //     continue
        // }
    }
    return `Nothing's cooked yet!`
}


// Adding ingridient we want
$('ul').on('click', '#add', function(){
    const pickedIngridient = $(this).prev().text();
    mealApp.chosenByUser.push(pickedIngridient);
    console.log(mealApp.chosenByUser);

    const result = mealApp.checkIfCooked();
    console.log(result);
});

// Removing ingridient we want
$('ul').on('click', '#remove', function(){
    const toRemove = $(this).next().text();
    console.log(toRemove);

    const toRemoveIndex = mealApp.chosenByUser.indexOf(toRemove);
    console.log(toRemoveIndex);

    mealApp.chosenByUser.splice(toRemoveIndex, 1);
    console.log(mealApp.chosenByUser);

    const result = mealApp.checkIfCooked();
    console.log(result);
});





mealApp.init = function() {
    mealApp.availableIngridients();
}

//Document ready
$(function() {
    mealApp.init();
})