window.addEventListener('load', function () {
    var charUrl = 'https://swapi.co/api/people/';
    var charListDiv = document.querySelector('.charList');
    var nextButton = document.querySelector('.next');
    var previousButton = document.querySelector('.previous');
    var undercoverDiv = document.querySelector('.undercover');
    var goBackBtn = document.querySelector('.go-back-btn');

    var curentPage = 10;
    let firsChar = 0;

    nextButton.addEventListener('click', goNextPage);
    previousButton.addEventListener('click', goBack);



    function goNextPage() {

        previousButton.classList.remove('hidden');

        curentPage += 10;
        firsChar += 10;
        charListDiv.innerHTML = '';
        createTenChar();
    }

    function goBack() {
        if (curentPage <= 10 || firsChar <= 0) {
            previousButton.classList.add('hidden');
        }
        if (curentPage > 10 || firsChar > 0) {
            curentPage -= 10;
            firsChar -= 10;
            charListDiv.innerHTML = '';
            createTenChar();
        }
    }

    var getJson = function (url, fooToCreateEl, charDiv) {
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return
                    }
                    response.json()
                        .then(function (data) {
                            fooToCreateEl(data, charDiv);
                        });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    function createTenChar() {
        for (let i = curentPage; i > firsChar; i--) {
            let newUrl = charUrl + i
            let charData = getJson(newUrl, createTableForChar);
        }
    }

    createTenChar();

    function showHide(e) {
        targetDiv = e.target.nextElementSibling;
        targetDiv.classList.toggle('hidden');
        undercoverDiv.classList.toggle('hidden');
    };

    function hideInfo(e) {
        targetDiv = e.target.parentNode.parentNode.parentNode;
        console.log(targetDiv);

        targetDiv.classList.toggle('hidden');
        undercoverDiv.classList.toggle('hidden');
    }

    function createTableForChar(data) {
        var charDiv = document.createElement('div');
        charDiv.innerHTML = charTempl;
        charDiv.querySelector('.name').innerHTML = data.name
        charDiv.querySelector('.name').addEventListener('click', showHide)
        charDiv.querySelector('.birthday').innerHTML = data.birth_year
        charDiv.querySelector('.gender').innerHTML = data.gender
        let filmArr = data.films;
        createFilmList(filmArr, charDiv);
        let planetUrl = data.homeworld;
        addPlanetOrSpecies(planetUrl, charDiv, 'homeworld');
        let speciesUrl = data.species;
        addPlanetOrSpecies(speciesUrl, charDiv, 'species')
        charListDiv.appendChild(charDiv);
        charDiv.querySelector('.go-back-btn').addEventListener('click', hideInfo)

    }

    function createFilmList(arr, charDiv) {
        for (let i = 0; i < arr.length; i++) {
            let filmUrl = arr[i];
            let film = getJson(filmUrl, createLiEl, charDiv);

        }
    }

    function createLiEl(data, charDiv) {
        let newli = document.createElement('li');
        newli.innerHTML = data.title;
        let filmList = charDiv.querySelector('.filmList');
        filmList.appendChild(newli);
    }

    function addPlanetOrSpecies(url, charDiv, className) {
        getJson(url, function (data) {
            charDiv.querySelector(`.${className}`).innerHTML = data.name
        })
    }


    var charTempl = `<div class="character">
                        <div class="name">

                        </div>
                        <div class="aditional-info hidden">
                            <div>
                                <div>
                                    Birthday
                                </div>
                                <div class="birthday">
                                    
                                </div>
                            </div>
                            <div>
                                <div>
                                    Gender
                                </div>
                                <div class="gender">
                                    
                                </div>
                            </div>
                            <div>
                                <div>
                                    Film list
                                </div>
                                <div class="films">
                                    <ul class="filmList">
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Home planet
                                </div>
                                <div class="homeworld">
                                </div>
                            </div>
                            <div>
                                <div>
                                    Species
                                </div>
                                <div class="species">
                                </div>
                            </div>
                            <div class="btn-wraper">
                                <div class="go-back-btn">
                                    <p>Go back to list</p>
                                </div>
                            </div>
                        </div>
                    </div>`


})