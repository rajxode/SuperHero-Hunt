

// getting hero's data from localStorage
const heroId = localStorage.getItem('heroId');

// title of webpage to be change dynamically
const pageTitle = document.querySelector('title');

// hero's info card container
const container = document.getElementById('infoCardContainer');

// section containing all the stories related to hero
const storyBox = document.getElementById('storiesContainer');
// section of all the series
const seriesBox = document.getElementById('seriesContainer');
// section of all the comics
const comicBox = document.getElementById('comicsContainer');


// fetching hero from api 
const fetchApi = async (urlString) => {
    try{
        // getting response
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/${urlString}?ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`);
        // converting data to json
        const data = await response.json();
        // storing and returning data
        const hero = data.data.results[0];    
        return hero;

    }catch(err){
        // if some error occures
        console.warn('Something went wrong.', err);
    }
}


// fetching all the stories , series and comics related to the hero
// for differnt url different data
const fetchDocument = async (urlString) => {
    try{
        // getting response
        const response = await fetch(`${urlString}?ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`);
        // converting to json
        const data = await response.json();
        // store and return data
        const document = data.data.results[0];
        return document;

    }catch(err){
        // if some error
        console.warn('Something went wrong.', err);
    }
}


// to display hero's info card on screen
const renderHeroInfo = (hero) => {

    // create a new div element
    var div=document.createElement('div');
    // adding the required classes to div
	div.classList.add("card","mb-3","w-75","cardBg");

    // inner text of div element with dynamic values 
	div.innerHTML=`
        <div class="row g-0">
            <div class="col-md-4">
                <img src=${hero.thumbnail.path}.${hero.thumbnail.extension} 
                    class="card-img-top" alt=${hero.name}
                    value=${hero.id}>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title text-danger" value=${hero.id}>${hero.name}</h5>
                    <p class="card-text text-light">${hero.description}</p>

                    <h5 class="card-title">
                        <a href="#storiesContainer" class="text-danger">
                            Stories:${hero.stories.available}
                        </a>
                    </h5>
                    <h5 class="card-title">
                        <a href="#comicsContainer" class="text-danger">
                            Comics: ${hero.comics.available}
                        </a>
                    </h5>
                    <h5 class="card-title">
                        <a href="#seriesContainer" class="text-danger">
                            Series: ${hero.series.available}
                        </a>
                    </h5>
                    <p class="card-text"><small>Last updated ${hero.modified.toString().slice(0,10)}</small></p>
                </div>
            </div>
        </div>
	`;

    // appending the card inside the container
	container.append(div);
	return;
}


// add different story, comic, series card to display
const addCardToDisplay = (card,type) => {

    // create a new div element
    var div = document.createElement('div');

    // add classes and set attributes
    div.classList.add("col");
	div.setAttribute('style',"max-width: 18rem;");

    // inner text of div
    div.innerHTML = `
        <div class="card h-100 smallCard">
            <div class="card-body">
                <h5 class="card-title text-danger">${card.title}</h5>
            </div>
            <div class="card-footer bg-transparent border-danger-subtle">
                <p class="card-text"><small>Last updated ${card.modified.toString().slice(0,10)}</small></p>
            </div>
        </div>
    `;

    // appending values to their respective sections
    // if the card type is story
    if(type === "story"){
        storyBox.append(div);
    }
    // if card belongs to series category
    else if(type === "series"){
        seriesBox.append(div);
    }
    // else appending the card to comic section
    else{
        comicBox.append(div);
    }   
}


// to render all the comic item to the display
const renderComics= (comicsList) => {

    // mapping over each item inside the comic list
    comicsList.map((comic,i) => {
        // showing only 8 items for each section
        // if index is greater than 7, return
        if( i > 7){
            return;
        }

        // getting the comic url form array
        const url = comic.resourceURI;
        // getting result from fetch function
        const result = fetchDocument(url);
        result.then(function(document){
            // display the result to the display
            addCardToDisplay(document,"comic");
        })
    })
}



// to display all the series items on screen
const renderSeries= (seriesList) => {
    // mapping over each element of series
    seriesList.map((series,i) => {

        // showing only 8 items form the list
        if( i > 7){
            return;
        }

        // getting url from the list
        const url = series.resourceURI;
        // getting result from api
        const result = fetchDocument(url);
        result.then(function(document){
            // display the result on screen
            addCardToDisplay(document,"series");
        })
    })
}


// display all the stories of hero on the screen
const renderStories= (storiesList) => {
    // mapping over each element of story array
    storiesList.map((story,i) => {
        // show only 8 items
        if( i > 7){
            return;
        }
        // getting story url
        const url = story.resourceURI;
        // getting result
        const result = fetchDocument(url);
        result.then(function(document){
            // display the result on screen
            addCardToDisplay(document,"story");
        })
    })
}


// initialize function to start all the operations
const initialize = () => {
    // creating a dynamic url of differnet heroes
    const url = `characters/${heroId}`;
    // getting hero's data from api
    const result = fetchApi(url);

    // calling all the function on result recieved form the api
    result.then(function(hero){
        // change page's title with hero's name
        pageTitle.innerHTML = `${hero.name} | Superhero`;
        // render hero's info card
        renderHeroInfo(hero);
        // display all the stories
        renderStories(hero.stories.items);
        // render all the series 
        renderSeries(hero.series.items);
        // show all the comics
        renderComics(hero.comics.items);
    })
}

// calling initialize function
initialize();
