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

  it('should have a rootNode with an empty object', () => {
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

      expect(tree.root.childrenObj).to.deep.equal({z: {value: 'z', childrenObj: {}, isAWord: true}});
    });

    it('should be able to add a word to the prefixTree', () => {
      tree.insert('be');

      expect(tree.root.childrenObj).to.deep.equal({ b: { 
        value: 'b', 
        childrenObj: {e: {value: 'e', childrenObj: {}, isAWord: true}}, 
        isAWord: false }});
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
    it('should increase the word count when adding multiple words from an array', () => {
      let wordArray = ['test', 'jest', 'best'];

      expect(tree.wordCount).to.equal(0);

      tree.populate(wordArray);
      expect(tree.wordCount).to.equal(3);
    });

    it('should insert multiple words from an array to the prefixTree', () => {
      let wordArray = ['me', 'be', 'ye'];

      tree.populate(wordArray);
      expect(tree.root.childrenObj.b).to.deep.equal({
        value: 'b',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true } },
        isAWord: false
      });
      expect(tree.root.childrenObj.y).to.deep.equal({
        value: 'y',
        childrenObj: { e: { value: 'e', childrenObj: {}, isAWord: true } },
        isAWord: false
      });
    });

    it('should insert a very large array to the prefixTree', () => {
      expect(tree.wordCount).to.equal(0);

      tree.populate(dictionary);
      expect(tree.wordCount).to.equal(234371);
    });
  });

  describe('suggest', () => {

    it('should suggest words based on the prefix passed to it', () => {
      expect(tree.suggestionArray.length).to.equal(0)

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork']
      tree.populate(thisArray);
      
      tree.suggest('pi');
      expect(tree.suggestionArray).to.deep.equal(['pin', 'pine', 'pint', 'pie', 'pizza']);
    });

    it.skip('should be able to find the rootNode', () => {
      let node = tree.find(4);

      expect(node).to.equal(tree.rootNode);
    });

    it.skip('should be able to find results to the immediate left (2)', () => {
      let node = tree.find(2);

      expect(node).to.equal(tree.rootNode.left);
    });

    it.skip('should be able to find results to the far left (1)', () => {
      let node = tree.find(1);

      expect(node).to.equal(tree.rootNode.left.left);
    });

    it.skip('should be able to find results to the immediate right (6)', () => {
      let node = tree.find(6);

      expect(node).to.equal(tree.rootNode.right);
    });

    it.skip('should be able to find nested results (5 and 3)', () => {
      let node = tree.find(5);

      expect(node).to.equal(tree.rootNode.right.left);
    });
  });

});

//to.have.property