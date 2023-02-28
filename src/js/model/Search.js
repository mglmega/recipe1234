import axios from "axios";
export default class Search {

    constructor(query){
        this.query = query;
    }


    async doSearch() {
        try {
          let result = await axios(
            "https://forkify-api.herokuapp.com/api/search?q=" + this.query
          );
          this.result = result.data.recipes;
          return this.result;
        //   console.log(recipes);
      
        //   result = await axios(
        //     "https://forkify-api.herokuapp.com/api/get?rId=" + recipes[1].recipe_id
        //   );
        //   console.log(result);
        } catch (error) {
          alert("aldaa : " + error);
        }
      }

}