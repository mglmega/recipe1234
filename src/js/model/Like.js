// import uniqid from 'uniqid';
export default class Like{
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.likes) this.likes = [];
    }

    addLike( id, title, publisher, img ){
        let newLike = { id, title, publisher, img};
        this.likes.push(newLike);

        // storageHadgalna
        this.savaDataToLocalStorage();

        return newLike;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id );
        if( index !== -1 ){
            this.likes.splice(index,1);

            // storageHadgalna
            this.savaDataToLocalStorage();
        }
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id ) !== -1;
    }

    getTotalLike(){
        return this.likes.length;
    }

    savaDataToLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
}