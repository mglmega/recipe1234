require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import {renderRecipe, clearRecipe, activeRecipe } from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likesView from "./view/likeView";

/*
web app tolov
- hailtiin ur dun
- jor detail
- like
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
  if(!state.like) state.like = new Like();

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
    renderRecipe(state.recipe, state.like.isLiked(id));
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
    const item = state.list.addItem(n)
    listView.renderItem(item);
  });
}

// like controller
const controlLike = () =>{
  // model
  if(!state.like) state.like = new Like();

  // odoo baigaa jor id oloh
  const currentRecipeId = state.recipe.id;

  // jor like darsan eshees hamaarch hadgalah ustgah
  if( state.like.isLiked(currentRecipeId) ){
    // model-s ustgah
    state.like.deleteLike(currentRecipeId);

    // likeTowchnii haragdah baidal
    likesView.toggleLikeButton(false);

    // liked tsesmees hasah
    likesView.deleteLike(currentRecipeId);
  } else {
    const newLike = state.like.addLike( 
      currentRecipeId, 
      state.recipe.title, 
      state.recipe.publisher, 
      state.recipe.image_url 
    );

    likesView.toggleLikeButton(true);
    likesView.renderLike(newLike);
  }

  // likeMenu
  likesView.toggleLikeMenu(state.like.getTotalLike());
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
  } else if(e.target.matches(`${elements.likeButtonClassName}, ${elements.likeButtonClassName} *`)){
    controlLike();
  }
});

elements.shoppingList.addEventListener('click', e => {
  // btn oloh
  if( e.target.matches(`${elements.shoppingRemoveItemBtn}, ${elements.shoppingRemoveItemBtn} *`) ){
    // id oloh
    
    const id = e.target.closest('.shopping__item').dataset.itemid;
    // models- oloh
    
    if( id ) state.list.deleteItem(id); 
    // delgetsees hasah
    listView.deleteItem(id);
  }
});

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

window.addEventListener('load', e => {
  // load hiihed like model duudna.
  if(!state.like) state.like = new Like();

  // likes menu haruulah eseh
  likesView.toggleLikeMenu(state.like.getTotalLike());

  // like bwal render hiine
  if( state.like.getTotalLike() > 0 ){
    state.like.likes.forEach(e => likesView.renderLike(e));
  }
});