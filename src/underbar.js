(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(array.length-Math.min(n, array.length));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }

    else {
      var keys=Object.keys(collection);
      for (var key of keys) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result=[];
    for (var i=0; i<collection.length; i++) {
      if (test(collection[i])===true) result.push(collection[i]);
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(x) {return !(test(x))});
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result=[];
    for (var i=0; i<array.length; i++) {
      if (_.indexOf(result, array[i])<0) result.push(array[i]);
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result=[];
    _.each(collection, function(x) {
      result.push(iterator(x));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    /*if (Array.isArray(collection)) {
      if (accumulator===undefined) {
        var total=collection[0];
        var start=1;
      }
      else {
        var total=accumulator;
        var start=0;
      }

      for (var i=start; i<collection.length; i++) {
        total = iterator(total, collection[i]);
      };
    }

    else {*/
      var keys=Object.keys(collection);
      if (accumulator===undefined) {
        var total=collection[keys[0]];
        var start=1;
      }
      else {
        var total=accumulator;
        var start=0;
      }
      for (var i=start; i<keys.length; i++) {
        total=iterator(total, collection[keys[i]]);
      };
   /* };*/

    return total;



   /* if (accumulator===undefined) {
      var total=collection[0];
      for (var i=1; i<collection.length; i++) {
        total = iterator(total, collection[i]);
      }
    }
    else {
      var total=accumulator;
      for (var i=0; i<collection.length; i++) {
        total = iterator(total, collection[i]);
      }
    }
    return total;*/

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    //var keys=Object.keys(collection);
    if (iterator===undefined) iterator=_.identity;
    return _.reduce(collection, function(matches, item) {
      if(!matches||!iterator(item)) return false;
      else return true;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator===undefined) iterator=_.identity;
    return !_.every(collection, function(x) {
      return (!iterator(x));
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i=1; i<arguments.length; i++) {
      var keys=Object.keys(arguments[i]); 
      for (var key of keys) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i=1; i<arguments.length; i++) {
      var keys=Object.keys(arguments[i]); 
      for (var key of keys) {
        if (!obj.hasOwnProperty(key))  obj[key] = arguments[i][key];
      }
    }
    return obj; 
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  //The test that's failing is failing because I didn't write a case for arrays, cause the
  //instructions say we can assume the function only takes primitives as arguments... come
  //back to this issue
  _.memoize = function(func) {
    var argumentsSoFar = [];
    var runWithArgs=false;
    var argumentsIndex;
    var resultsList=[];

    /* a function that tests if arrays are equal (also works for numbers and 
    strings, null, anything you can check with a "===") -- necessary to pass "should not run memoize function twice
    when given a reference type as an argument" */
    var arrayEquals = function(a, b) {
        if (typeof a === 'object' && typeof b === 'object') {
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            if (aKeys.length !== bKeys.length) return false;
            for (var i=0; i<aKeys.length; i++) {
                if (a[aKeys[i]]!== b[bKeys[i]]) return false;
            }
        }
        else {
            if (a===b) return true;
            else return false;
        }
    };


    return function() {
      //check if function has already been run with these arguments
      var result;

      if (argumentsSoFar.length>0) {
        for (var j=0; j<argumentsSoFar.length; j++){
          var count=0;
          for (var i=0; i<arguments.length; i++) {
            if (arrayEquals(arguments[i], argumentsSoFar[j][i])===false) count++;
          }
          if (count===0) {
            runWithArgs=true;
            argumentsIndex=j;
          } 
        }
      }
      if (runWithArgs===false) {
        result=func.apply(this, arguments);
        resultsList.push(result);
        argumentsSoFar.push(arguments);
      }
      else {
        result=resultsList[argumentsIndex];
      }
      return result;

    };
};



  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args=[];
    for (var i=2; i<arguments.length; i++) {
      args.push(arguments[i]);
    }
    return setTimeout(function() {return func.apply(this, args)}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  	var orderHolder = {};
  	var shuffledArray=[];

  	/* create an object that assigns each array element a random order number */
  	for (var i=0; i<array.length; i++) {
  		var item=[];
  		item.push(array[i]);
  		item.push(Math.random());
  		orderHolder[i]=item;
  	}

  	
  	for (var i=0; i<array.length; i++) {
  		var current=1;
  		var nextUp=-1;
  		for (var j=0; j<array.length; j++) {
  			if (orderHolder[j][1]<current) {
  				current=orderHolder[j][1];
  				nextUp=j;
  			}
  		}
  		shuffledArray.push(orderHolder[nextUp][0]);
  		orderHolder[nextUp][1]=2;
  	}
  	return shuffledArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var keys = Object.keys(collection);
    var result=[];
    var additionalArgs = [];
    for (var i=2; i<arguments.length; i++) {
      additionalArgs.push(arguments[i]);
    }

    for (var key of keys) {
      if (typeof functionOrKey==="string") {
        result.push(collection[key][functionOrKey](additionalArgs));
      }
      else if (typeof functionOrKey==="function") {
        result.push(functionOrKey.apply(collection[key], additionalArgs));
      }
    }
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var result=[];

    if (typeof iterator==="string") {
      var alreadyUsed = [];
      for (var i=0; i<collection.length; i++) {
        alreadyUsed.push(0);
      }
      var values=_.pluck(collection, iterator);
      values.sort();
      //i is for iterator value
      for (var i=0; i<collection.length; i++) {
        //j is for looping through collection for each iterator value
        for (var j=0; j<collection.length; j++) {
          if (collection[j][iterator]===values[i] && alreadyUsed[j]===0) {
            result.push(collection[j]);
            alreadyUsed[j]=1;
          }
        }
      }
    }

    else if (typeof iterator==="function") {
      var placeHolder=[];
      for (var i=0; i<collection.length; i++) {
        placeHolder.push({place: iterator(collection[i]), value: collection[i]});
      }
      var placeHolderSorted = _.sortBy(placeHolder, "place");
      result=_.pluck(placeHolderSorted, "value"); 
    }
    return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var maxlength=0;
    var result=[];
    for (var i=0; i<arguments.length; i++){
      if (arguments[i].length>maxlength) maxlength = arguments[i].length;
    }
    for (var i=0; i<maxlength; i++) {
      var toPush=[];
      for (var j=0; j<arguments.length; j++) {
        if (arguments[j][i]===undefined) toPush.push(undefined);
        else toPush.push(arguments[j][i]);
      }
      result.push(toPush);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var results=[];
    for (var i=0; i<nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])===false) results.push(nestedArray[i]);
      else {
        var tempArray=_.flatten(nestedArray[i]);
        for (var j=0; j<tempArray.length; j++) {
          results.push(tempArray[j]);
        }
      }
    }
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result=[];
    //loop through elements of arguments[0]
    for (var i=0; i<arguments[0].length; i++) {
      //loop through arguments starting with second argument
      var inAll=1;
      for (var j=1; j<arguments.length; j++) {
        if (_.indexOf(arguments[j], arguments[0][i])<0) inAll=0;
      }
      if (inAll===1) result.push(arguments[0][i]);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
      var result=[];
    //loop through elements of arguments[0]
    for (var i=0; i<arguments[0].length; i++) {
      //loop through arguments starting with second argument
      var inDiff=1;
      for (var j=1; j<arguments.length; j++) {
        if (_.indexOf(arguments[j], arguments[0][i])>=0) inDiff=0;
      }
      if (inDiff===1) result.push(arguments[0][i]);
    }
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var alreadyCalled = false;
    var totalDelay=0;

    return function() {
      if (!alreadyCalled) {
        alreadyCalled = true;
        return func.apply(this, arguments);
      }
      else if (alreadyCalled) {
        totalDelay+=wait;
        return setTimeout(function() {return func.apply(this, arguments)}, totalDelay);
      }
    };
  };
}());
