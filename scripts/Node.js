export default class Node {
  constructor(word = null) {
    this.data = word[0];
    this.children = {};
  }
}