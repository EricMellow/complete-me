import Node from '../scripts/Node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();
    this.suggestionArray =[];
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
//make getting to end of prefix its own function
//end of 'pi'
//call suggest on pi + children keys
//call recursively to end of word
//make sure you're adding to prefix, so it carries value to next recursive call

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



  // if (currentNode.isAWord) {
  //   this.suggestion += currentNode.value;
  //   this.suggestionArray.push(this.suggestion)
  // }

  //   if () {
  //     let letters = Object.keys(currentNode.childrenObj);
  //     letters.forEach(letter => this.suggest(letter, currentNode));
  //   }
  //   this.suggest(word.substr(1), currentNode)
  //   return this.suggestionArray;
  }

populate(words) {

  }

  delete(word) {

  }

  count() {
    return this.wordCount;
  }
}