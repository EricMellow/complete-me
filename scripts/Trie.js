import Node from '../scripts/Node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();

  }

  insert(word, currentNode = this.root) {
    if (!word.length) {
      this.isAWord = true;
      return;
    }

    if (!currentNode.childrenObj[word[0]]) {
      currentNode.childrenObj[word[0]] = new Node();
      currentNode.childrenObj[word[0]].value = word[0];
    }
    currentNode = currentNode.childrenObj[word[0]]
    this.insert(word.substr(1), currentNode)
  }

  suggest(word) {

  }

  populate(words) {

  }

  delete(word) {

  }

  count() {
    return this.wordCount;
  }
}