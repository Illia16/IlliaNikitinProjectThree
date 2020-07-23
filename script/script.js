const mealApp = {};

mealApp.chosenIngridients = [];

mealApp.cookedMeals = [];

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
            <h3>${mealApp.allIngridients[i]}</h3>
            <div><img src="./assets/${mealApp.allIngridients[i]}.png" alt="${mealApp.allIngridients[i]}"></img></div>
            <button id="add" value="${mealApp.allIngridients[i]}">Add</button>
            <button id="remove" value="${mealApp.allIngridients[i]}">Remove</button>
        </li>
        `);
    }

    for (const meals in  mealApp.answers) {
        // const everyMeal = meals;
        $('.cookedMeals').append(`
        <li class="${meals}">
            <h3>${meals}</h3>
            <div><img src="./assets/meals/${meals}.png" alt="${meals}"></img></div>
            <p>Ingridients needed to cook: ${mealApp.answers[meals]}</p>
        </li>
        `);
    }
}

// Display dinamically on the table chosen ingridients 
mealApp.displayChosen = () => {
    $('.chosenIngridients').text('');
    for (i=0; i < mealApp.chosenIngridients.length; i++) {
        $('.chosenIngridients').append(`
        <li>
            <h3>${mealApp.chosenIngridients[i]}</h3>
            <div><img src="./assets/${mealApp.chosenIngridients[i]}.png" alt="${mealApp.chosenIngridients[i]}"></img></div>
        </li>
        `);
    }
}

// Check if something is cooked based on the chosen ingridients
mealApp.checkIfCooked = function() {

    for (const meals in  mealApp.answers) {
        // console.log(`${meals}: ${mealApp.answers[meals]}`);
        
        if (mealApp.chosenIngridients.sort().join(',') === mealApp.answers[meals].sort().join(','))
        {
            mealApp.cookedMeals.push(meals);
            mealApp.chosenIngridients = [];
            console.log("Cooked meals:", mealApp.cookedMeals);

            $(`.cookedMeals .${meals}`).toggleClass('unlocked'); ////////
            return `We made a ${meals}`;
        }
    }
    return `Nothing's cooked yet!`;
}


// Adding ingridient we want
$('ul').on('click', '#add', function(){
    const pickedIngridient = $(this).val();
    mealApp.chosenIngridients.push(pickedIngridient);
    console.log(mealApp.chosenIngridients);

    const result = mealApp.checkIfCooked();
    console.log(result);

    mealApp.displayChosen();
});

// Removing ingridient we want
$('ul').on('click', '#remove', function(){
    const toRemove = $(this).val();
    console.log("What to remove:", toRemove);

    const toRemoveIndex = mealApp.chosenIngridients.indexOf(toRemove);
    console.log("Index of the item to be removed:", toRemoveIndex);

    if (mealApp.chosenIngridients.length === 0) {
        console.log('Nothing\'s on the table!');
    } else if (toRemoveIndex === -1) {
        console.log(`${toRemove} is not on the table!`);
    } else mealApp.chosenIngridients.splice(toRemoveIndex, 1);
    console.log("after removal:", mealApp.chosenIngridients);

    const result = mealApp.checkIfCooked();
    console.log(result);

    mealApp.displayChosen();
});




$('.cooked').on('click', function(event){
    event.preventDefault();
    $('.cookedMeals').toggleClass('cookedMealsShow');
});

// mealApp.startOver = function() {
    $('#toMain').on('click', function(event){
        event.preventDefault();
        mealApp.scroll('section');
    });
//}


//smooth scrool to come to a desired part of the page
mealApp.scroll = function(element) {
	$('html').animate(
		{
            scrollTop: $(element).offset().top
		}, 1000
	);
};


mealApp.init = function() {
    mealApp.availableIngridients();
    // mealApp.startOver();
}

//Document ready
$(function() {
    mealApp.init();
})