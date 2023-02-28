import { elements } from "./base";

const renderRecipe = recipe => {
    // results__link--active
    const markup = `<li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="${recipe.title}">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${recipe.title}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>`;

    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};


const createPageButton = (page, type, direction) => `
    <button class="btn-inline results__btn--${type}" 
            data-goto="${page}">
            <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
        <span>Хуудас ${page}</span>
    </button>`;

const renderPageButtons = (currentPage,totalPages) => {
    let buttonHtml;

    if( currentPage === 1 && totalPages > 1 ){
        // 1 huudas
        buttonHtml = createPageButton(2,'next','right');
    } else if(currentPage < totalPages){
        // dundah huudas
        buttonHtml = createPageButton(currentPage - 1,'prev','left');
        buttonHtml += createPageButton(currentPage + 1,'next','right');
    } else if(currentPage === totalPages) {
        // suuliin huudas
        buttonHtml = createPageButton(currentPage - 1,'prev','left');
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
}

export const clearSearchQuery = () => {
    elements.searchInput.value = '';
};

export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
};

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resultPerPage = 10) => {
    // ur dun haruulah
    const start = (currentPage - 1) * resultPerPage;
    const end = currentPage * resultPerPage;
    // recipes.forEach(element => renderRecipe(element)); towchlol door hiilee
    recipes.slice(start,end).forEach(renderRecipe);

    // huudaslalt haruulah
    const totalPages = Math.ceil(recipes.length / resultPerPage);
    renderPageButtons(currentPage,totalPages);
};