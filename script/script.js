const mealApp = {};

mealApp.chosenIngridients = [];
mealApp.cookedMeals = {};
mealApp.cookedMealsIfCooked = {};

mealApp.answers = {
    taco: ['salad', 'bacon', 'olives', 'egg', 'tomato'],
    smoothie: ['banana', 'milk', 'pineapple'],
    orangeJuice: ['orange', 'orange', 'orange'],
}

mealApp.allIngridients = ['banana', 'milk', 'pineapple', 'avocado', 'orange'];

// making sure that the counter of cooked meals is always right
mealApp.cookedMealsCounter = function() {
    for (const meals in  mealApp.answers) {
        mealApp.cookedMeals[meals] = 0;
    }
}

// Filling DOM with available ingridients
mealApp.availableIngridients = function() {
    $('.ingridients').text('');
    for (i=0; i < mealApp.allIngridients.length; i++) {
        $('.ingridients').append(`
        <li>
            <p>${mealApp.allIngridients[i]}</p>
            <div><img src="./assets/${mealApp.allIngridients[i]}.png" alt="${mealApp.allIngridients[i]}"></img></div>
            <button id="add" value="${mealApp.allIngridients[i]}">Add</button>
        </li>
        `);
    }

    mealApp.moreIng();
}

// showing all meals in database 
mealApp.allMeals = function() {
    $('.cookedMeals').text('');
    for (const meals in  mealApp.answers) {
        if (mealApp.cookedMealsIfCooked[meals]) {
            $('.cookedMeals').append(`
            <li class="${meals} unlocked">
                <span>${mealApp.cookedMeals[meals]}</span><p>${meals}</p>
                <div><img src="./assets/meals/${meals}.png" alt="${meals}"></img></div>
                <p>Ingridients needed: ${mealApp.answers[meals].join(', ')}</p>
            </li>
            `);
        } else {
            $('.cookedMeals').append(`
            <li class="${meals}">
                <span></span><p>${meals}</p>
                <div><img src="./assets/meals/${meals}.png" alt="${meals}"></img></div>
                <p>Ingridients needed: ${mealApp.answers[meals].join(', ')}</p>
            </li>
            `);
        }
    }
}

// Display dinamically on the table chosen ingridients 
mealApp.displayChosen = () => {
    $('.chosenIngridients').text('');
    for (i=0; i < mealApp.chosenIngridients.length; i++) {
        $('.chosenIngridients').append(`
        <li>
            <p>${mealApp.chosenIngridients[i]}</p>
            <div><img src="./assets/${mealApp.chosenIngridients[i]}.png" alt="${mealApp.chosenIngridients[i]}"></img></div>
            <button id="remove" value="${mealApp.chosenIngridients[i]}">Remove</button>
        </li>
        `);
    }
}

// Check if something is cooked based on the chosen ingridients
mealApp.checkIfCooked = function() {
    
    for (const meals in  mealApp.answers) {
        if (mealApp.chosenIngridients.sort().join(',') === mealApp.answers[meals].sort().join(','))
        {   
            mealApp.cookedMeals[meals] += 1;
            mealApp.cookedMealsIfCooked[meals] = true;
            mealApp.chosenIngridients = [];

            $('.sectionTwo .table .done').text('').animate({ opacity: 1 });
            $(`.cookedMeals .${meals} span`).text(`Made ${mealApp.cookedMeals[meals]} times`);

            // $(`.cookedMeals .${meals}`).addClass('unlocked');
            $(`.cookedMeals .${meals}`).css('box-shadow', 'gold 5px 5px');
            $('.sectionTwo .table .done').append(`We made ${meals}`).animate({ opacity: 0}, 1500);
        }
    }
}

// Adding ingridient we want
$('ul').on('click', '#add', function(){
    const pickedIngridient = $(this).val();
    mealApp.chosenIngridients.push(pickedIngridient);
    mealApp.checkIfCooked();
    mealApp.displayChosen();
});

// Removing ingridient we want
$('ul').on('click', '#remove', function(){
    const toRemove = $(this).val();
    const toRemoveIndex = mealApp.chosenIngridients.indexOf(toRemove);

    if (mealApp.chosenIngridients.length === 0) {
        console.log('Nothing\'s on the table!');
    } else if (toRemoveIndex === -1) {
        console.log(`${toRemove} is not on the table!`);
    } else mealApp.chosenIngridients.splice(toRemoveIndex, 1);

    mealApp.checkIfCooked();
    mealApp.displayChosen();
});

// show all recipe & UNLOCKED ones & how many times user cooked
$('.cooked').on('click', function(event){
    event.preventDefault();
    $('.cookedMeals').toggleClass('cookedMealsShow');
    $('.addNewRecipe').removeClass('addNewRecipeShow');
});

// show window with adding new ingr OR meals
$('.addNew').on('click', function(event){
    event.preventDefault();
    $('.addNewRecipe').toggleClass('addNewRecipeShow');
    $('.cookedMeals').removeClass('cookedMealsShow');
});

// adding a new ingridient to database
$('#addIngridient').on('click', function(event){
    event.preventDefault();
    const ingridientToAdd = $(this).prev().val();

    if (ingridientToAdd === '' || !isNaN(ingridientToAdd)) {
        console.log('Error');
    } else mealApp.allIngridients.push(ingridientToAdd.toLowerCase());

    mealApp.availableIngridients();
});

// creating an empty array to check if name of added meals is defined
mealApp.ingr = [];

// add a new meal to database with its ingridients
$('#addMeal').on('click', function(event){
    event.preventDefault();
    // name of new meal
    const newMeal = ($('#newMealName').val()).toLowerCase().split(' ').join('');

    mealApp.ingr = [];

    $('.ingr').each(function(){
        const ingr = $(this).val();

        if (ingr === "") {
            console.log('Error');
            console.log(mealApp.ingr);
        } else {
            mealApp.ingr.push($(this).val());
        }
    });

    if (newMeal === '' || !isNaN(parseInt(newMeal)) || mealApp.ingr.length === 0 || mealApp.answers.hasOwnProperty(newMeal)) {
        console.log('Enter a valid name of the new meal');
        console.log("updated menu:", mealApp.answers);
    } else  
        {
            // how many ingridients
            mealApp.answers[newMeal] = [];
            mealApp.cookedMeals[newMeal] = 0;
            const howMany = $('#howManyIng').val();

            for(i=0; i < howMany; i++) {
                const ingridiendToAdd = $(`#ingridient${i+1}`).val();
                mealApp.answers[newMeal].push(ingridiendToAdd.toLowerCase());
            }

            mealApp.allMeals();
        }
});


// adding more inputs for ingridients
mealApp.moreIng = () => {
    $('.moreIngridients').text('');
    const howMany = $('#howManyIng').val();

    for (i=0; i < howMany; i++) {
        $('.moreIngridients').append(`
        <label for="ingridient${i+1}" class="sr-only">Name</label>
        <input type="text" id="ingridient${i+1}" class="name input-fields ingr" name="name" placeholder="Ingridient #${i+1}" required/>
        `)
    }
}

$('#howManyIng').on('change', function(event){
    event.preventDefault();
    mealApp.moreIng();
});

    $('#toMain').on('click', function(event){
        event.preventDefault();
        mealApp.scroll('section');
    });

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
    mealApp.cookedMealsCounter();
    mealApp.allMeals();
}

//Document ready
$(function() {
    mealApp.init();
})