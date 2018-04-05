const Node = require('../scripts/Node');

class prefixTree {
  constructor() {
    this.root = new Node();
    this.suggestionArray =[];
    this.wordCount = 0;
  }

  insert(word, currentNode = this.root) {
    if (typeof word !== 'string') {
      return null;
    }

    word = word.toLowerCase();
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

    currentNode = currentNode.childrenObj[word[0]];
    this.insert(word.substr(1), currentNode);
  }

  suggest(word, currentNode = this.root) {
    if (typeof word !== 'string') {
      return null;
    }

    this.suggestionArray = [];
    word = word.toLowerCase();

    for (let i = 0; i < word.length; i++) {
      if (currentNode.childrenObj[word[i]]) {
        currentNode = currentNode.childrenObj[word[i]];
      } else {
        return null;
      }
    }

    this.getSuggestions(word, currentNode);
    return this.suggestionArray;
  }

  getSuggestions(prefix, currentNode) {
    
    if (currentNode.isAWord) {
      this.suggestionArray.push(prefix);
    }

    let letters = Object.keys(currentNode.childrenObj);
    letters.forEach(letter => {
      return this.getSuggestions(prefix + letter, currentNode.childrenObj[letter]);
    });
  }

  populate(wordsArray) {
    if (!Array.isArray(wordsArray)) {
      return null;
    }
    wordsArray.forEach(word => this.insert(word));
  }

  delete(word) {

  }

  count() {
    return this.wordCount;
  }
}

module.exports = prefixTree;