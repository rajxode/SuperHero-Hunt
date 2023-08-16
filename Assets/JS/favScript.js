

// getting favourite list form localStorage
const favString = localStorage.getItem("fav")
// store the data from localStorage into the array
var favourites = JSON.parse(favString);

// heading of page to change on condition of favourite array
const pageHeading = document.getElementById('pageHeading');

// container of page to display card's of all the hero's on screen
const favContainer = document.getElementById('heroContainer');


// for toast notification 
const toastContainer = document.querySelector('.toast');
const toast = new bootstrap.Toast(toastContainer);
const toastMessage = document.querySelector('.toast-body');


// add card to hero to display
const addFavToDisplay = (hero) => {
    // create a new div element
    var div=document.createElement('div');

	// add class to the div and set value attribute
    div.classList.add("card","mb-3","cardItem");
	div.setAttribute('value',hero.id);

    // inner text of div
	div.innerHTML=`
            <img src=${hero.thumbnail.path}.${hero.thumbnail.extension} 
                class="card-img-top" alt=${hero.name}
                value=${hero.id}>

            <div class="card-body">
                <h5 class="card-title" value=${hero.id}>${hero.name}</h5>
                <button value=${hero.id} class="btn btn-dark cardBtn">Remove from Favourite</button>
            </div>
	`;

    // append the div element inside the container
	favContainer.append(div);
	return;
}



// show all the heroes inside the favourite list on the screen
const renderFavouriteList = () => {
    // reset container's data
    favContainer.innerHTML='';
    favourites.map((hero) => addFavToDisplay(hero));
    return;
}


// if the favourite array doesn't have any item in it
if(favourites === null || favourites.length === 0){
    // display the current heading on the page
    pageHeading.innerHTML='<h1>Nothing in Your Favourite List</h1>';
}
else{
    // else render all the superhero
    renderFavouriteList();
}



// remove a hero form list
const removeFromFav = (heroId) => {

    // filter the favourite array (on the basis of heroId)
    // and store all items in new array
    const newFav = favourites.filter((hero) => hero.id != heroId);

    // storing new data again in favourite list
    favourites=newFav;

    // storing new data on local Storage
    let favString = JSON.stringify(favourites);
	localStorage.setItem("fav", favString);

    // showing toast notification of removing from favourite
    toastContainer.classList.add('bg-success','text-emphasis-success');
    toastMessage.innerHTML='Hero Removed from your favourite list.';
    toast.show();

    // render the new favourite list to display
    renderFavouriteList();
    return;
}



// click events
const buttonClick = (event) => {

    // getting target element
    const target = event.target;

    // if the button clicked is remove button
    if(target.className === "btn btn-dark cardBtn"){
        event.preventDefault();
        removeFromFav(target.value);
        return;
    }


    // if target element is info Card-image or name
    else if(target.className === "card-img-top" || target.className === "card-title"){
		
        // store the heroId value on localStorage
        const heroId = target.getAttribute('value');
		localStorage.setItem('heroId',heroId);

        // redirect user to superHero.html page
		window.location.href = "./Superhero.html";
		return;
	}
}


// event listener
document.addEventListener('click',buttonClick);

