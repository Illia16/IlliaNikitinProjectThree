const mealApp = {};

// ingridients that are on the table
mealApp.chosenIngridients = [];

// meals that have been cooked
mealApp.cookedMeals = {};

// check if a certain meal/drink was cooked AT LEAST ONCE(True/False)
mealApp.cookedMealsIfCooked = {};

// all recipes
mealApp.answers = {
    taco: ['salad', 'bacon', 'olives', 'egg', 'tomato'],
    smoothie: ['banana', 'milk', 'pineapple'],
    orangeJuice: ['orange', 'orange', 'orange'],
}

// all ingridients
mealApp.allIngridients = ['banana', 'milk', 'pineapple', 'avocado', 'orange', 'apple', 'bacon', 'carrot', 'egg', 'olives', 'potato', 'tomato'];

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
            <button id="removeIng" class="closeWindow" value=${mealApp.allIngridients[i]} aria-label="remove this ingridient from ingridient database"><i class="fas fa-times" aria-hidden="true"></i></button>
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

            $('.letsCook .table .done').text('').animate({ opacity: 1 });
            $(`.cookedMeals .${meals} span`).text(`Made ${mealApp.cookedMeals[meals]} times`);

            $(`.cookedMeals .${meals}`).css('box-shadow', 'gold 5px 5px');
            $('.letsCook .table .done').append(`We made ${meals}`).animate({ opacity: 0}, 750);
        }
    }
}

// Adding ingridient we want to the table
$('ul').on('click', '#add', function(){
    const pickedIngridient = $(this).val();
    mealApp.chosenIngridients.push(pickedIngridient);
    mealApp.checkIfCooked();
    mealApp.displayChosen();
});

// Removing ingridient we want FROM DATABASE
$('ul').on('click', '#removeIng', function(){
    const ingToRemove = $(this).val();
    mealApp.allIngridients.splice( $.inArray(ingToRemove, mealApp.allIngridients), 1 );
    $(this).parent().remove();
});

// Removing ingridient we want FROM THE TABLE
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

// adding a new ingridient to database
$('#addIngridient').on('click', function(event){
    event.preventDefault();
    const ingridientToAdd = $(this).prev().val();

    if (ingridientToAdd === '' || !isNaN(ingridientToAdd)) {
        console.log('Error');
    } else {
        $(this).prev().val('');
        mealApp.allIngridients.push(ingridientToAdd.toLowerCase());
    }
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
        <label for="ingridient${i+1}" class="sr-only">Name of ingridient number ${i+1}</label>
        <input type="text" id="ingridient${i+1}" class="name input-fields ingr" name="name" placeholder="Ingridient #${i+1}"/>
        `)
    }
}

$('#howManyIng').on('change', function(event){
    event.preventDefault();
    const howMany = $('#howManyIng').val();

    if (howMany <= 15) {
        $('#howManyIng').attr('placeholder',`Meal will have ${howMany} ingridients`);
        mealApp.moreIng();
    } else  {
        $('#howManyIng').val('');
        $('#howManyIng').attr('placeholder','Can\'t be that many ingridients!');
    }
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