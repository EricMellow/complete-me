import Node from '../scripts/Node';

export default class prefixTrie {
  constructor() {
    this.root = new Node();
    this.suggestionArray =[];
    this.wordCount = 0;
  }

  insert(word, currentNode = this.root) {
    if (!word.length) {
      if (!currentNode.isAWord) {
        currentNode.isAWord = true;
        this.wordCount++;
        return;
      }
      return;
    }
    if (!currentNode.childrenObj[word[0]]) {
      currentNode.childrenObj[word[0]] = new Node();
      currentNode.childrenObj[word[0]].value = word[0];
    }
    currentNode = currentNode.childrenObj[word[0]]
    this.insert(word.substr(1), currentNode)
  }

  suggest(word, currentNode = this.root) {
    this.suggestionArray = [];

    for (let i = 0; i < word.length; i++) {
      if (currentNode.childrenObj[word[i]]) {
        currentNode = currentNode.childrenObj[word[i]];
      }
    }

    this.getSuggestions(word, currentNode)
    return this.suggestionArray;
  }

  getSuggestions(prefix, currentNode = this.root) {
    
    if (currentNode.isAWord) {
      this.suggestionArray.push(prefix)
    }

    let letters = Object.keys(currentNode.childrenObj)
    letters.forEach(letter => {
      return this.getSuggestions(prefix + letter, currentNode.childrenObj[letter])
    })

  }

  populate(wordsArray) {
    wordsArray.forEach(word => this.insert(word))
  }

  delete(word) {

  }

  count() {
    return this.wordCount;
  }
}