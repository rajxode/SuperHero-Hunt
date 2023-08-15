

const favString = localStorage.getItem("fav");

var favourites = [];

// Retrieved array
if(favString){
	favourites = JSON.parse(favString);
}


const toastContainer = document.querySelector('.toast');
const toast = new bootstrap.Toast(toastContainer);
const toastMessage = document.querySelector('.toast-body');


const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const listContainer = document.getElementById('heroContainer');
const favBtn = document.getElementsByClassName('cardBtn');

function addHeroToDisplay(hero){
    // creating html element 'li'
	var div=document.createElement('div');
    // inner data of div element
    // with alarm time and a delete button
	div.classList.add("card","mb-3","cardItem");
	div.setAttribute('value',hero.id);

	div.innerHTML=`
			<img src=${hero.thumbnail.path}.${hero.thumbnail.extension} 
				class="card-img-top" alt="${hero.name}" 
				value=${hero.id} >

			<div class="card-body">
				<h5 class="card-title" value=${hero.id} >${hero.name}</h5>
				<button value=${hero.id} class="btn btn-dark cardBtn">
						Add to Favourite
				</button>
			</div>
	`;

    // the the alarm inside the div
	listContainer.append(div);
	return;

}


const renderList = (list) => {
	if(list.length === 0 || false ){
		listContainer.innerHTML='Nothing to show!!';
		return;
	}
	listContainer.innerHTML='';
	list.map((hero) => addHeroToDisplay(hero));
}


const fetchCharacterNameStartWith = (name) => {
	fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`)
		.then(function (response) {

			// The API call was successful!
			if (response.ok) {
				return response.json();
			}

			// There was an error
			return Promise.reject(response);

		}).then(function (data) {
			// This is the JSON from our response
			const list = [...data.data.results];
			renderList(list);
		}).catch(function (err) {
			// There was an error
			console.warn('Something went wrong.', err);
		});
}

searchBar.addEventListener("input",() => {
	fetchCharacterNameStartWith(searchBar.value);
})



fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`)
.then(function (response) {

	// The API call was successful!
	if (response.ok) {
		return response.json();
	}

	// There was an error
	return Promise.reject(response);

}).then(function (data) {
	// This is the JSON from our response
	const list = [...data.data.results];
	renderList(list);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});



const fetchBYId = (heroId) => {
	fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroId}?ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`)
.then(function (response) {

	// The API call was successful!
	if (response.ok) {
		return response.json();
	}

	// There was an error
	return Promise.reject(response);

}).then(function (data) {
	// This is the JSON from our response
	favourites.push(data.data.results[0]);
	let favString = JSON.stringify(favourites);
	localStorage.setItem("fav", favString);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
}


// function for handling click events on different icons 
function iconClick(event){
	const target=event.target;
	if(target.className === "btn btn-dark cardBtn"){
		event.preventDefault();
		let found = false;
		if(favourites !== null){
			favourites.map((hero) => {
				if(hero.id === Number(target.value)){
					toastContainer.classList.add('bg-danger');
					toastContainer.classList.add('text-emphasis-danger');
					toastMessage.innerHTML='Hero Already in your favourite list.';			
					found = true;
				}
			})
		}
		if(!found){
			fetchBYId(target.value);
			toastContainer.classList.add('bg-success','text-emphasis-success');
			toastMessage.innerHTML='Hero added to your favourite list.';
		}
		toast.show();
		return;
	}

	else if(target.className === "card-img-top" || target.className === "card-title"){
		const heroId = target.getAttribute('value');
		localStorage.setItem('heroId',heroId);
		window.location.href = "../../Pages/Superhero.html";
		return;
	}
}

document.addEventListener('click',iconClick);

