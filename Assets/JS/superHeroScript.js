


const heroId = localStorage.getItem('heroId');
const container = document.getElementById('infoCardContainer');
const pageTitle = document.querySelector('title');

const storyBox = document.getElementById('storiesContainer');
const seriesBox = document.getElementById('seriesContainer');
const comicBox = document.getElementById('comicsContainer');

const fetchApi = async (urlString) => {
    try{
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/${urlString}?ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`);
        const data = await response.json();
        const hero = data.data.results[0];    
        return hero;
    }catch(err){
        console.warn('Something went wrong.', err);
    }
}


const fetchDocument = async (urlString) => {
    try{
        const response = await fetch(`${urlString}?ts=1&apikey=c3f4ed990ef754516e046c67291af987&hash=0dd23907783ca4f0d5306f874e305f85`);
        const data = await response.json();
        const document = data.data.results[0];
        return document;
    }catch(err){
        console.warn('Something went wrong.', err);
    }
}


const renderHeroInfo = (hero) => {
    var div=document.createElement('div');
	div.classList.add("card","mb-3","w-75","cardBg");
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
	container.append(div);
	return;
}


const addCardToDisplay = (card,type) => {
    console.log(card,type);
    var div = document.createElement('div');

    div.classList.add("col");
	div.setAttribute('style',"max-width: 18rem;");

    // <div class="card border-success mb-3" style="max-width: 18rem;">
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
    if(type === "story"){
        storyBox.append(div);
    }
    else if(type === "series"){
        seriesBox.append(div);
    }
    else{
        comicBox.append(div);
    }   
}


const renderComics= (comicsList) => {
    comicsList.map((comic,i) => {
        if( i > 7){
            return;
        }
        const url = comic.resourceURI;
        const result = fetchDocument(url);
        result.then(function(document){
            addCardToDisplay(document,"comic");
        })
    })
}

const renderSeries= (seriesList) => {
    seriesList.map((series,i) => {
        if( i > 7){
            return;
        }
        const url = series.resourceURI;
        const result = fetchDocument(url);
        result.then(function(document){
            addCardToDisplay(document,"series");
        })
    })
}

const renderStories= (storiesList) => {
    storiesList.map((story,i) => {
        if( i > 7){
            return;
        }
        const url = story.resourceURI;
        const result = fetchDocument(url);
        result.then(function(document){
            addCardToDisplay(document,"story");
        })
    })
}



const initialize = () => {
    const url = `characters/${heroId}`;
    const result = fetchApi(url);
    result.then(function(hero){
        console.log(hero);
        pageTitle.innerHTML = `${hero.name} | Superhero`;
        renderHeroInfo(hero);
        renderStories(hero.stories.items);
        renderSeries(hero.series.items);
        renderComics(hero.comics.items);
    })
}


initialize();
