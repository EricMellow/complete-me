const expect = require('chai').expect;
const Node = require('../scripts/Node');

describe('Node', () => {
  
  it('should have a default value of null, default isAWord of false, and default childrenObj of an empty object', () => {
    let node = new Node();

    expect(node.value).to.equal(null);
    expect(node.childrenObj).to.deep.equal({});
    expect(node.isAWord).to.equal(false);
  });
});