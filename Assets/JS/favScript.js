

// Retrieving favourites list from localStorage
const favString = localStorage.getItem("fav")

// Retrieved array
var favourites = JSON.parse(favString);

const pageHeading = document.getElementById('pageHeading');
const favContainer = document.getElementById('heroContainer');


const toastContainer = document.querySelector('.toast');
const toast = new bootstrap.Toast(toastContainer);
const toastMessage = document.querySelector('.toast-body');


const addFavToDisplay = (hero) => {
    var div=document.createElement('div');
    // inner data of div element
    // with alarm time and a delete button
	div.classList.add("card","mb-3","cardItem");
	div.setAttribute('value',hero.id);

	div.innerHTML=`
            <img src=${hero.thumbnail.path}.${hero.thumbnail.extension} 
                class="card-img-top" alt=${hero.name}
                value=${hero.id}>

            <div class="card-body">
                <h5 class="card-title" value=${hero.id}>${hero.name}</h5>
                <button value=${hero.id} class="btn btn-dark cardBtn">Remove from Favourite</button>
            </div>
	`;

    // the the alarm inside the div
	favContainer.append(div);
	return;
}

const renderFavouriteList = () => {
    favContainer.innerHTML='';
    favourites.map((hero) => addFavToDisplay(hero));
    return;
}



if(favourites === null || favourites.length === 0){
    pageHeading.innerHTML='<h1>Nothing in Your Favourite List</h1>';
}
else{
    renderFavouriteList();
}


const removeFromFav = (heroId) => {
    const newFav = favourites.filter((hero) => hero.id != heroId);
    favourites=newFav;
    let favString = JSON.stringify(favourites);
	localStorage.setItem("fav", favString);
    toastContainer.classList.add('bg-success','text-emphasis-success');
    toastMessage.innerHTML='Hero Removed from your favourite list.';
    toast.show();
    renderFavouriteList();
    return;
}

const buttonClick = (event) => {
    const target = event.target;
    if(target.className === "btn btn-dark cardBtn"){
        event.preventDefault();
        removeFromFav(target.value);
        return;
    }
}


document.addEventListener('click',buttonClick);

