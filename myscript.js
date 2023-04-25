let searchInputEl = document.getElementById('searchInput');
let spinner = document.getElementById('spinner');
let searchResultsEl = document.getElementById('searchResults');

function createAndAppend(result) {
    let divContainer = document.createElement('div');
    divContainer.classList.add('result-item');
    searchResultsEl.appendChild(divContainer);

    let anchorTitle = document.createElement('a');
    anchorTitle.textContent = result.title;
    anchorTitle.href = result.link;
    anchorTitle.target = '_blank';
    anchorTitle.classList.add('result-title');
    divContainer.appendChild(anchorTitle);

    let br = document.createElement('br');
    divContainer.appendChild(br);

    let anchorLink = document.createElement('a');
    anchorLink.textContent = result.link;
    anchorLink.href = result.link;
    anchorLink.target = '_blank';
    anchorLink.classList.add('result-url');
    divContainer.appendChild(anchorLink);

    let br1 = document.createElement('br');
    divContainer.appendChild(br1);

    let description = document.createElement('p');
    description.textContent = result.description;
    description.classList.add('link-description');
    divContainer.appendChild(description);
}

function displayResults(searchResult) {
    for (let result of searchResult) {
        createAndAppend(result);
    }
}

function searchingWikipedia(event) {

    if (event.key === 'Enter') {
        spinner.classList.remove('d-none');
        searchResultsEl.textContent = '';
        let searchInput = searchInputEl.value;
        console.log(searchInput);
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchInput;

        let options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                spinner.classList.add('d-none');
                let {
                    search_results
                } = data;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener('keydown', searchingWikipedia);
