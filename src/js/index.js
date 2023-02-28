require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

/*
web app tolov
- hailtiin ur dun
- jor detail
- like
- order detail
*/

const state = {};
const controlSearch = async () =>{
  // search value
  const query = searchView.getInput();

  if( query ){
    // hailtiin obj uusgene.
    state.search = new Search(query);

    // hailtad zoriulj UI beldene.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // hailt hiine
    await state.search.doSearch();

    // ur dung gargan
    clearLoader();
    if( state.search.result === undefined ) alert('Ur dun oldsongui');
    else searchView.renderRecipes(state.search.result);

  } else {
    alert('Hailt ug oruulna uu');
  }
 
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.pageButtons.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if( btn ){
    const goToPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goToPageNumber);
    // (recipes, currentPage = 1, resultPerPage = 10)
  }
});
// search__btn

// 

// search.doSearch().then(r => console.log(r));
// doSearch("pizza"); javascript1234/recipe