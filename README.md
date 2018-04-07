# complete-me

Complete-me is a JS prefix trie with several functions"

## .insert()

This will allow you to add a specific word to your trie. It takes a string as an argument.

## .suggest()

This will suggest words from the tree based on the letters passed to it. It takes a string as an argument
and returns an array of the suggested words.
An example:
.suggest('pi') will return ['pie', 'pin', 'pizza', etc...] if you have populated your trie with the dictionary

## .select()

This will increase the "weight" of the word passed to it. It takes a string as an argument. 
Words with more weight get returned first (at the beginning of the suggest array). The weight 
of the word will increase by one (1) each time it is selected.

## .populate()

This will add multiple words to your trie at one time It takes an array of strings as an argument.

## .count()

This will return the total number of words in your trie.
