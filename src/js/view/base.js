export const elements = {
    searchForm: document.querySelector('.search'),
    searchResultDiv: document.querySelector('.results'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    pageButtons: document.querySelector('.results__pages')
};

export const elementString = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `<div class="${elementString.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"</use>
        </svg>
    </div>`;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if( loader ) loader.parentElement.removeChild(loader);
};

// results
// recipe