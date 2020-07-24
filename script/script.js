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
    $('.ingridients').text('');
    for (i=0; i < mealApp.allIngridients.length; i++) {
        $('.ingridients').append(`
        <li>
            <h3>${mealApp.allIngridients[i]}</h3>
            <div><img src="./assets/${mealApp.allIngridients[i]}.png" alt="${mealApp.allIngridients[i]}"></img></div>
            <button id="add" value="${mealApp.allIngridients[i]}">Add</button>
        </li>
        `);
    }
//            <button id="remove" value="${mealApp.allIngridients[i]}">Remove</button>
    mealApp.allMeals();
}

// showing all meals in database 
mealApp.allMeals = function() {
    $('.cookedMeals').text('');
    for (const meals in  mealApp.answers) {
        // const everyMeal = meals;
        $('.cookedMeals').append(`
        <li class="${meals}">
            <h3>${meals}</h3><span></span>
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
            <button id="remove" value="${mealApp.chosenIngridients[i]}">Remove</button>
        </li>
        `);
    }
}

// Check if something is cooked based on the chosen ingridients
mealApp.howManyTimesCooked = null;

mealApp.checkIfCooked = function() {

    for (const meals in  mealApp.answers) {
        // console.log(`${meals}: ${mealApp.answers[meals]}`);
        
        if (mealApp.chosenIngridients.sort().join(',') === mealApp.answers[meals].sort().join(','))
        {
            mealApp.cookedMeals.push(meals);
            mealApp.chosenIngridients = [];
            mealApp.howManyTimesCooked += 1;
            console.log("Cooked meals:", mealApp.cookedMeals);

            $(`.cookedMeals .${meals} span`).text(mealApp.howManyTimesCooked);
            $(`.cookedMeals .${meals}`).addClass('unlocked'); ////////
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



// show all recipe & UNLOCKED ones & how many times user cooked
$('.cooked').on('click', function(event){
    event.preventDefault();
    $('.cookedMeals').toggleClass('cookedMealsShow');
    $('.addNewRecipe').removeClass('addNewRecipeShow');
});


// add ingridients to database window
$('.addNew').on('click', function(event){
    event.preventDefault();
    $('.addNewRecipe').toggleClass('addNewRecipeShow');
    $('.cookedMeals').removeClass('cookedMealsShow');
});


// adding a new ingridient to database
$('#addIngridient').on('click', function(event){
    event.preventDefault();
    console.log(this);

    const ingridientToAdd = $(this).prev().val();
    mealApp.allIngridients.push(ingridientToAdd.toLowerCase());
    mealApp.availableIngridients();
});


// $('#addMoreIngridients').on('click', function(event){
//     event.preventDefault();

//     $('.moreIngridients').append(`
//         <label for="ingridientForMeal" class="sr-only">Name</label>
//         <input type="text" id="ingridientForMeal" class="name input-fields" name="name" placeholder="Ingridient #1" required>
//     `);
// });

$('#addMeal').on('click', function(event){
    event.preventDefault();

    const newMeal = ($('#newMealName').val()).toLowerCase();
    const ingridiendToAdd = $('#ingridientForMeal').val();
    mealApp.answers[newMeal] = [];
    mealApp.answers[newMeal].push(ingridiendToAdd.toLowerCase());
    console.log(mealApp.answers);
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