require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import {renderRecipe, clearRecipe, activeRecipe } from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";

/*
web app tolov
- hailtiin ur dun
- jor detail
- like
- order detail
*/

const state = {};

// search controller
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

// recipe controller
const controlRecipe = async () => {
  // url id awah
  const id = window.location.hash.replace('#','');

  if( id ){
    // active recipe
    activeRecipe(id);

    // model duudah
    state.recipe = new Recipe(id);

    // UI beldeh
    clearRecipe();
    renderLoader(elements.recipeDiv);

    // joroo awchrah
    await state.recipe.getRecipe();

    // joriig hugatsaa orj tootsooloh
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();

    // loader arilgah
    clearLoader();

    // joroo delgetsend gargah
    renderRecipe(state.recipe);
  }
}

// nairlaga conroller
const controlList = () =>{
  // nairlaga model
  state.list = new List();

  // huuchin sags tseverleh
  listView.clearItems();

  // modelruu nairlaga ilgeeh
  state.recipe.ingredients.forEach(n => {
    state.list.addItem(n)
    listView.renderItem(n);
  });

  // state.recipe.ingredients
}

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

elements.recipeDiv.addEventListener('click', e => {
  if( e.target.matches(`${elements.addCartButton}, ${elements.addCartButton} *`) ){
    controlList();
  }
});

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));