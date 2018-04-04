import { expect } from 'chai';
import Trie from '../scripts/Trie';

describe('Trie', () => {
  let trie = new Trie();
  let thisarray = ['dog', 'cat', 'sharknado', 'cat']
  // trie.insert('pin');
  // trie.insert('pint');
  // trie.insert('pie');
  // trie.insert('pizza');
  // trie.insert('pine');
  // trie.insert('pot');


  trie.populate(thisarray)
  console.log(JSON.stringify(trie, null, 2));
  // trie.suggest('pi');
  // console.log(trie.suggest('pi'));

})