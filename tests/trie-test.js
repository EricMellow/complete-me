const expect = require('chai').expect;
const prefixTree = require('../scripts/Trie');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Prefix tree', () => {
  let tree;

  beforeEach(() => {
    tree = new prefixTree();
  });

  it('should have a rootNode that is a new Node with a value of null and a childrenObj of an empty object', () => {
    expect(tree.root.value).to.equal(null);
    expect(tree.root.childrenObj).to.deep.equal({});
    expect(tree.root.isAWord).to.equal(false);
  });

  it('should start with an empty suggestion array and no words', () => {
    expect(tree.suggestionArray).to.deep.equal([]);
    expect(tree.wordCount).to.equal(0);
  });

  describe('insert', () => {
    it('should be able to add a node to the prefixTree', () => {
      tree.insert('Z');

      expect(tree.root.childrenObj).to.deep.equal({z: {value: 'z', childrenObj: {}, isAWord: true, weight: 0}});
    });

    it('should be able to add a word to the prefixTree', () => {
      tree.insert('be');

      expect(tree.root.childrenObj).to.deep.equal({ b: { 
        value: 'b', 
        childrenObj: {e: {value: 'e', childrenObj: {}, isAWord: true, weight: 0}}, 
        isAWord: false,
        weight: 0 }});
    });

    it('should return null if it is not passed a string', () => {
      let numberPassed = tree.insert(2313);

      expect(numberPassed).to.equal(null);
    });

    it('should be able to change the "isAWord" value of a node that is the end of a word to true', () => {
      tree.insert('Be');

      expect(tree.root.childrenObj.b.childrenObj.e.isAWord).to.deep.equal(true);
    });

    it('should add 1 to the number of words the prefixTree has when it adds a word', () => {
      expect(tree.wordCount).to.equal(0);

      tree.insert('test');
      expect(tree.wordCount).to.equal(1);

      tree.insert('jest');
      tree.insert('best');
      expect(tree.wordCount).to.equal(3);
    });

    it('should not add 1 to the number of words the prefixTree has if the word already exists', () => {
      expect(tree.wordCount).to.equal(0);

      tree.insert('test');
      expect(tree.wordCount).to.equal(1);

      tree.insert('test');
      expect(tree.wordCount).to.equal(1);
    });
  });

  describe('populate', () => {
    it('should insert multiple words from an array to the prefixTree', () => {
      let wordArray = ['me', 'be', 'ye'];
      
      tree.populate(wordArray);
      expect(tree.root.childrenObj.b).to.deep.equal({
        value: 'b',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 0 } },
        isAWord: false,
        weight: 0
      });
      expect(tree.root.childrenObj.y).to.deep.equal({
        value: 'y',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 0 } },
        isAWord: false,
        weight: 0
      });
      expect(tree.wordCount).to.equal(3);
    });
    
    it('should return null if it is not passed an array', () => {
      
      let numberPassed = tree.populate(2313);
      expect(numberPassed).to.equal(null);
    });

    it('should insert a very large array to the prefixTree', () => {
      expect(tree.wordCount).to.equal(0);
      
      tree.populate(dictionary);
      expect(tree.wordCount).to.equal(234371);
    });

    it('should increase the word count when adding multiple words from an array', () => {
      let wordArray = ['test', 'jest', 'best'];

      expect(tree.wordCount).to.equal(0);

      tree.populate(wordArray);
      expect(tree.wordCount).to.equal(3);
    });
  });

  describe('suggest', () => {

    it('should suggest words based on the prefix passed to it', () => {
      expect(tree.suggestionArray.length).to.equal(0);

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);
      
      let suggestions = tree.suggest('pi');
      expect(suggestions).to.deep.equal(['pin', 'pine', 'pint', 'pie', 'pizza']);
    });

    it('should suggest the prefix it is passed, if that happens to be a word', () => {
      expect(tree.suggestionArray.length).to.equal(0);

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);

      let suggestions = tree.suggest('pin');
      expect(suggestions).to.deep.equal(['pin', 'pine', 'pint']);
    });

    it('should return null if it is not passed a number', () => {
      expect(tree.suggestionArray.length).to.equal(0);

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);

      let numberPassed = tree.suggest(2313);
      expect(numberPassed).to.equal(null);
    });

    it('should suggest words and not be case sensitive', () => {
      expect(tree.suggestionArray.length).to.equal(0);

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);

      let suggestions = tree.suggest('PI');
      expect(suggestions).to.deep.equal(['pin', 'pine', 'pint', 'pie', 'pizza']);
    });

    it('should always set the suggestionArray to empty first', () => {
      expect(tree.suggestionArray).to.deep.equal([]);

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);

      let suggestions = tree.suggest('pi');
      expect(suggestions).to.deep.equal(['pin', 'pine', 'pint', 'pie', 'pizza']);

      let secondArray = ['bet', 'bean', 'burrito', 'pizza', 'bear', 'test', 'jest', 'bee'];

      tree.populate(secondArray);
      let secondSuggestions = tree.suggest('be');
      expect(secondSuggestions).to.deep.equal(['bet', 'bean', 'bear', 'bee']);
    });

    it('should return null if there are no suggestions)', () => {
      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);

      let nullAnswer = tree.suggest('co');
      expect(nullAnswer).to.equal(null);
    });
  });

  describe('count', () => {
    it('should return the total word count', () => {

      tree.populate(dictionary);
      let countTotal = tree.count();

      expect(countTotal).to.equal(234371);
    });
  });

  describe('select', () => {
    it('should add weight to the selected word', () => {
      let wordArray = ['me', 'be', 'ye'];

      tree.populate(wordArray);
      tree.select('ye');
      expect(tree.root.childrenObj.b).to.deep.equal({
        value: 'b',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 0 } },
        isAWord: false,
        weight: 0
      });
      expect(tree.root.childrenObj.y).to.deep.equal({
        value: 'y',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 1 } },
        isAWord: false,
        weight: 0
      });
    });

    it('should add weight to the selected word each time it is selected', () => {
      let wordArray = ['me', 'be', 'ye'];

      tree.populate(wordArray);
      tree.select('ye');
      expect(tree.root.childrenObj.b).to.deep.equal({
        value: 'b',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 0 } },
        isAWord: false,
        weight: 0
      });
      expect(tree.root.childrenObj.y).to.deep.equal({
        value: 'y',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 1 } },
        isAWord: false,
        weight: 0
      });
      
      tree.select('ye');
      expect(tree.root.childrenObj.y).to.deep.equal({
        value: 'y',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true, weight: 2 } },
        isAWord: false,
        weight: 0
      });
    });

    it('should add words with a larger weight to the beginning of the suggestionArray', () => {
      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork'];
      tree.populate(thisArray);

      tree.select('pizza');
      tree.select('pizza');
      let suggestions = tree.suggest('pi');
      expect(suggestions).to.deep.equal(['pizza', 'pin', 'pine', 'pint', 'pie']);
    });
  });
});