

// Retrieving favourites list from localStorage
const favString = localStorage.getItem("fav")

// Retrieved array
var favourites = JSON.parse(favString);

const pageHeading = document.getElementById('pageHeading');
const favContainer = document.getElementById('heroContainer');


const addFavToDisplay = (hero) => {
    var a=document.createElement('a');
    // inner data of div element
    // with alarm time and a delete button
	a.classList.add('text-decoration-none');
	a.setAttribute('href',`./Pages/Superhero.html`);

	a.innerHTML=`
			<div class="card mb-3 cardItem">
				<img src=${hero.thumbnail.path}.${hero.thumbnail.extension} class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">${hero.name}</h5>
					<a href="#">
					<button value=${hero.id} class="btn btn-dark cardBtn">Remove from Favourite</button>
					</a>
				</div>
			</div>
	`;

    // the the alarm inside the div
	favContainer.append(a);
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

