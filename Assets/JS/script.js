


const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const listContainer = document.getElementById('heroContainer');
const favBtn = document.getElementsByClassName('cardBtn');

function addHeroToDisplay(hero){
    // creating html element 'li'
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
					<button value=${hero.id} class="btn btn-dark cardBtn">Add to Favourite</button>
					</a>
				</div>
			</div>
	`;

    // the the alarm inside the div
	listContainer.append(a);
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
			console.log(list);
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


// function for handling click events on list icons 
function iconClick(event){
	const target=event.target;
	if(target.className === "btn btn-dark cardBtn"){
		console.log(target.value);
		return;
	}

	else if(target.className === "custom_check"){
		changeTaskStatus(target.id);
		return;
	}
}

document.addEventListener('click',iconClick);