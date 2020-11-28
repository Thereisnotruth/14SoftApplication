import { SearchContentModel } from '../Model';

class SearchModel {
  constructor(str) {
    this.searchContentModel = new SearchContentModel(str);
  }

  search() {
    return this.searchContentModel.search();
  }
  
}

export default SearchModel;