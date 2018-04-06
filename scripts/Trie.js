const Node = require('../scripts/Node');

class prefixTree {
  constructor() {
    this.root = new Node();
    this.suggestionArray = [];
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

    if (!currentNode.childrenObj[ word[0] ]) {
      currentNode.childrenObj[ word[0] ] = new Node();
      currentNode.childrenObj[ word[0] ].value = word[0];
    }

    currentNode = currentNode.childrenObj[ word[0] ];
    this.insert(word.substr(1), currentNode);
  }

  suggest(word, currentNode = this.root) {
    if (typeof word !== 'string') {
      return null;
    }

    this.suggestionArray = [];
    word = word.toLowerCase();

    for (let i = 0; i < word.length; i++) {
      if (currentNode.childrenObj[ word[i] ]) {
        currentNode = currentNode.childrenObj[ word[i] ];
      } else {
        return null;
      }
    }

    this.getSuggestions(word, currentNode);
    
    let sortedObjectsArray = this.suggestionArray.sort((a, b) => b.value - a.value);
    console.log(sortedObjectsArray)
    let cleanArray = sortedObjectsArray.map(object => object.word)
    return cleanArray;
  }

  getSuggestions(prefix, currentNode) {
    
    if (currentNode.isAWord) {
    
      currentNode.weight++;
      this.suggestionArray.push({word: prefix, value: currentNode.weight});
    }

    let letters = Object.keys(currentNode.childrenObj);
    letters.forEach(letter => {
      return this.getSuggestions(prefix + letter, currentNode.childrenObj[letter]);
    });
  }

  select(word) {

    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (currentNode.childrenObj[word[i]]) {
        currentNode = currentNode.childrenObj[word[i]];
      } 
    }
    currentNode.weight++;
  }

  populate(wordsArray) {
    if (!Array.isArray(wordsArray)) {
      return null;
    }
    wordsArray.forEach(word => this.insert(word));
  }

  delete() {

  }

  count() {
    return this.wordCount;
  }
}

module.exports = prefixTree;