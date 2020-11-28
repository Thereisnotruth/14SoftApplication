import axios from 'axios';

class SearchContentModel {
  constructor(str) {
    this.content = str;
  }
  getContent() {
    return this.content;
  }
  search() {
    const str = this.getContent().split(/[, ]+/);
    const data = axios.post('/v1/search', {
      content: str
    });
    return data;
  }
}
export default SearchContentModel;