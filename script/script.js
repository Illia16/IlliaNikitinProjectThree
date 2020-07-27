const mealApp = {};

mealApp.chosenIngridients = [];

mealApp.cookedMeals = {};
mealApp.cookedMealsIfCooked = {};

mealApp.answers = {
    smoothie: ['banana', 'milk', 'pineapple'],
    orangeJuice: ['orange', 'orange', 'orange'],
}

mealApp.allIngridients = ['banana', 'milk', 'pineapple', 'avocado', 'orange'];

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
//            <button id="remove" value="${mealApp.allIngridients[i]}">Remove</button>

    mealApp.moreIng();
}

// showing all meals in database 
mealApp.allMeals = function() {
    $('.cookedMeals').text('');
    for (const meals in  mealApp.answers) {
        if (mealApp.cookedMealsIfCooked[meals]) {
            $('.cookedMeals').append(`
            <li class="${meals} unlocked">
                <p>${meals}</p><span>${mealApp.cookedMeals[meals]}</span>
                <div><img src="./assets/meals/${meals}.png" alt="${meals}"></img></div>
                <p>Ingridients needed: ${mealApp.answers[meals]}</p>
            </li>
            `);
        } else {
            $('.cookedMeals').append(`
            <li class="${meals}">
                <p>${meals}</p><span></span>
                <div><img src="./assets/meals/${meals}.png" alt="${meals}"></img></div>
                <p>Ingridients needed: ${mealApp.answers[meals]}</p>
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
        console.log(`${meals}: ${mealApp.answers[meals]}`);
        console.log(typeof(meals));

        if (mealApp.chosenIngridients.sort().join(',') === mealApp.answers[meals].sort().join(','))
        {   
            mealApp.cookedMeals[meals] += 1;
            mealApp.cookedMealsIfCooked[meals] = true;
            mealApp.chosenIngridients = [];

            console.log("Cooked meals:", mealApp.cookedMeals);
            console.log("Cooked meals if cooked?:", mealApp.cookedMealsIfCooked);

            $('.sectionTwo .table .done').text('').animate({ opacity: 1 });


            $(`.cookedMeals .${meals} span`).text(mealApp.cookedMeals[meals]);
            $(`.cookedMeals .${meals}`).addClass('unlocked'); ////////
            console.log(`We made a ${meals}`);
            $('.sectionTwo .table .done').append(`We made ${meals}`).animate({ opacity: 0}, 1500);
        }
    }

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


// show window with adding new ingr OR meals
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

    if (ingridientToAdd === '' || !isNaN(ingridientToAdd)) {
        console.log('Error');
    } else mealApp.allIngridients.push(ingridientToAdd.toLowerCase());

    mealApp.availableIngridients();
});


mealApp.ingr = [];

// add a new meal to database with its ingridients
$('#addMeal').on('click', function(event){
    event.preventDefault();

    // name of new meal
    const newMeal = ($('#newMealName').val()).toLowerCase().split(' ').join('');
    console.log("New meal name:", newMeal);
    console.log(typeof(newMeal));
    console.log(typeof(parseInt(newMeal)));
    console.log(isNaN(parseInt(newMeal)));


    mealApp.ingr = [];
    $('.ingr').each(function(){
        console.log($(this).val());
        const ingr = $(this).val();
        console.log(typeof(parseInt(ingr)));

        if (ingr === "") {
            console.log('Error');
            console.log(mealApp.ingr);
        } else {
            mealApp.ingr.push($(this).val());
            console.log(mealApp.ingr);
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
                console.log("New ingridient:", ingridiendToAdd);
                console.log(typeof(ingridiendToAdd));

                mealApp.answers[newMeal].push(ingridiendToAdd.toLowerCase());
                console.log("updated menu:", mealApp.answers);
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
    mealApp.cookedMealsCounter();
    mealApp.allMeals();
    // mealApp.startOver();
}

//Document ready
$(function() {
    mealApp.init();
})