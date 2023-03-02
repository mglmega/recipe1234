import uniqid from 'uniqid';
export default class list{
    constructor(){
        this.items = [];
    }

    addItem( item ){
        let newItem = {
            id: uniqid(),
            item: item
        };
        // this.items.push(item);
        this.items.push(newItem);

        return newItem;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id );
        if( index ){
            this.items.splice(index,1);
        }
    }

    // addItem( item ){
    //     // this.items.push(item);
    //     this.items.push(
    //         {
    //             id: uniqid(),
    //             item: item
    //         }
    //     );
    // }

    // getItems(){
    //     return this.items('getItems');
    // }
}