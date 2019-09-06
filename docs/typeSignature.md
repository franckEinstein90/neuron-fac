A type signature object: can be constructed using either a function or an array as parameter - is a description of a type

- TypeSignature [A] constructs a type signature for an atomic type A
- TypeSignature([A,B]) constructs a type signature (ts) corresponding to type A->B
- TypeSignature(X => [X,X,X]) constructs a type signature corresponding to TTX.X->X->X


TypeSignature objects can be compared (same or different) and can be combined following usual rules:
 - combine [A,B] [A] returns B
 - combine X=>[X,X,X] [A] returns A->A->A

A type register object: holds type signatures, indexes them, and associates them with name and aliases. A type register can also extend another type register, being able to access the types stored in its ancestor type register

A frame object holds an unique id, and a reference to a type register. It can also be extended, so a descendant frame has access to all included in its ancestor frame

A type object:
- is associated with a unique type signature, and is a set of functional objects that can be added to it via various methods. So for example, 
1. Define a new type object BIOP = [NUM, NUM, NUM]
2. Add elements to it, such as plus: x,y => x + y, minus x,y => x - y and so forth - then those elements can be referred to in the global scope as: BIOP.plus, BIOP.minus, 
Type element's most important inner value is a string. That string is the code of the program that it represent: 

e.g:
BIOP.plus = "(x,y) => x + y"

A connector object is able to take types and type elements and legally combine them. 
- connectors also have type signatures
- are able to create a javascript program that correspnds to themselves: 

