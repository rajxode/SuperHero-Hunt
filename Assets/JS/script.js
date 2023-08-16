
// array for storing all the favourite heroes
var favourites = [];

// getting favourite's data from localStorage if there is any 
const favString = localStorage.getItem("fav")

// if there is some data in localstorage 
if(favString){
	// store it inside the favourite array
	favourites = JSON.parse(favString);
}


// toast container to show toast notification on addition to favourite
const toastContainer = document.querySelector('.toast');
const toast = new bootstrap.Toast(toastContainer);
// for adding dynamic message to the toast notification 
const toastMessage = document.querySelector('.toast-body');


// serach bar
const searchBar = document.getElementById('searchBar');
// search button
const searchBtn = document.getElementById('searchBtn');
// container for page containing cards of all the heroes
const listContainer = document.getElementById('heroContainer');
// add to favourite button 
const favBtn = document.getElementsByClassName('cardBtn');


// adding a single hero card to display
function addHeroToDisplay(hero){
    // creating html element 'div'
	var div=document.createElement('div');
    
	// adding classes and setting some attribute to the div 
	div.classList.add("card","mb-3","cardItem");
	div.setAttribute('value',hero.id);


	// inner text of div element
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

    // appending the div inside the container
	listContainer.append(div);
	return;
}


// function to render the whole container page
const renderList = (list) => {

	// if the list doesn't have any item
	if(list.length === 0 || false ){
		// render this message on screen 
		listContainer.innerHTML='<h1 class="m-auto">Sorry, Nothing to show, Try something different !!</h1>';
		return;
	}

	// setting the container to blank
	listContainer.innerHTML='';
	// adding each element of list to the container
	// making cards for each element
	list.map((hero) => addHeroToDisplay(hero));
}


// fetch data of a superhero from api on the basis of name Starting with some character
const fetchCharacterNameStartWith = async (url) => {
	try{
		// getting response from api
		const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters${url}&ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`);
		// converting response into json
		const data = await response.json();
		// storing data inside the list
		const list = [...data.data.results];
		// calling render function to add all element to display
		renderList(list);
	}catch(err) {
		// if There was an error
		console.warn('Something went wrong.', err);
	}
}


// fetching hero from api when user type something inside the search bar
searchBar.addEventListener("input",() => {
	// creating dynamic url with user's input
	const url = `?nameStartsWith=${searchBar.value}`
	// fetching data form api
	fetchCharacterNameStartWith(url);
})



// fetch api to get list of  all the characters 
const fetchApi = async (url) => {
	try{
		// getting response from api
		const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters${url}ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`)
		// converting response to json
		const data = await response.json();
		// storing data inside a list
		const list = [...data.data.results];
		// calling render function to display all items 
		renderList(list);
	}catch(err) {
		// if There was an error
		console.warn('Something went wrong.', err);
	}
}


// fetch hero by id to store inside the favourite list
const fetchBYId = async (url) => {
	try{
		// getting response
		const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters${url}ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`)
		// convert to json
		const data = await response.json();
		// push data inside the favourites array
		favourites.push(data.data.results[0]);
		// storing the data on localStorage by converting into string
		let favString = JSON.stringify(favourites);
		localStorage.setItem("fav", favString);

	}catch(err){
		// if there was some error
		console.warn('Something went wrong.', err);
	}
}


// function for handling click events on different elements 
const iconClick = (event) =>{
	// getting target element
	const target=event.target;


	// if the target element was favourite button
	if(target.className === "btn btn-dark cardBtn"){
		// prevent default action
		event.preventDefault();
		// to see if the hero already exist inside the array
		// initially false
		let found = false;

		// if array is not empty
		if(favourites !== null){
			// map over each element of array
			favourites.map((hero) => {
				// if hero found inside the favourite array
				if(hero.id === Number(target.value)){
					// show toast notification of hero already in side the list
					toastContainer.classList.add('bg-danger','text-emphasis-danger');
					toastMessage.innerHTML='Hero Already in your favourite list.';			
					// found true
					found = true;
				}
			})
		}

		// if hero not found then 
		if(!found){
			// create dynamic url
			const url = `/${target.value}?`;
			// fetch hero from api
			fetchBYId(url);

			// show toast notification of success message
			toastContainer.classList.add('bg-success','text-emphasis-success');
			toastMessage.innerHTML='Hero added to your favourite list.';
		}

		// make toast visible on screen
		toast.show();
		return;
	}


	// if target element was card image or name
	else if(target.className === "card-img-top" || target.className === "card-title"){
		// get heroes Id from card
		const heroId = target.getAttribute('value');
		// store the hero inside the localstorage to show hero's page
		localStorage.setItem('heroId',heroId);
		// redirect user to superhero page
		window.location.href = "./Pages/Superhero.html";
		return;
	}
}

// adding event listner to whole page
document.addEventListener('click',iconClick);


// initialize function to start all function
const initialize = () => {
	const url = `?`;
	fetchApi(url);
}

// calling initialize function
initialize();
