
const heroId = localStorage.getItem('heroId');
const container = document.getElementById('infoCardContainer');

const pageTitle = document.querySelector('title');


const addCardToDisplay = () => {

}


const renderComics= (comicsList) => {
    comicsList.map((comic) => 
        console.log(comic)
    )
}

const renderSeries= (seriesList) => {
    seriesList.map((series) => 
        console.log(series)
    )
}

const renderStories= (storiesList) => {
    storiesList.map((story) => 
        console.log(story)
    )
}


const renderHeroInfo = (hero) => {
    console.log(hero);
    var div=document.createElement('div');
    // inner data of div element
    // with alarm time and a delete button
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
                    <h5 class="card-title" value=${hero.id}>${hero.name}</h5>
                    <p class="card-text text-light">${hero.description}</p>
                    <h5 class="card-title">Stories:${hero.stories.available}</h5>
                    <h5 class="card-title">Comics: ${hero.comics.available}</h5>
                    <h5 class="card-title">Series: ${hero.series.available}</h5>
                    <p class="card-text"><small class="text-light">Last updated ${hero.modified.toString().slice(0,10)}</small></p>
                </div>
            </div>
        </div>
	`;
    // the the alarm inside the div
	container.append(div);
    
	return;
}

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

const initialize = () => {
    const url = `characters/${heroId}`;
    const result = fetchApi(url);
    result.then(function(hero){
        pageTitle.innerHTML = `${hero.name} | Superhero`;
        renderHeroInfo(hero);
        renderStories(hero.stories.items);
        renderSeries(hero.series.items);
        renderComics(hero.comics.items);
    })
}


initialize();
