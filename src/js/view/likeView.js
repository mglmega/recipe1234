import { elements } from "./base";

export const toggleLikeButton = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
}


export  const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
    /* <div class="likes">
          <div class="likes__field">
            <svg class="likes__icon">
              <use href="img/icons.svg#icon-heart"></use>
            </svg>
          </div>
          
        </div> */
}

export const renderLike = like =>{
    const html = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.publisher}</p>
            </div>
        </a>
    </li>`;

    elements.likeList.insertAdjacentHTML('beforeend', html);
}


export const deleteLike = id => {
    const likeItemLiTag = document.querySelector(`a${elements.likedItemClassName}[href*="${id}"]`).parentElement;
    if( likeItemLiTag ) likeItemLiTag.parentElement.removeChild(likeItemLiTag);
}