@import 'common.js'
//@import 'library/sandbox.js'

var onRun = function(context) {

	var doc = context.document;
	var selection = context.selection;
	var pages = [doc pages];

	//name of the Symbols page
  var symbolsPageName = "Symbols";

	//initialize the variables
	var previousX = 0;
	var previousWidth = 0;
	var symbolY = 0;
	var offset = 100;

  //if the doc has a symbol page store it in here
  var hasSymbolsPage = false;
  hasSymbolsPage = checkIfHasSymbolsPage(pages, symbolsPageName);

  //reference a selected layer
  var selection = context.selection;

	if(hasSymbolsPage == true){

		organizeSymbols(doc, pages, symbolsPageName, symbolY, previousX, previousWidth, offset);
		alert("The symbols are all lined up in a nice row.", "Organization Complete!");

	} else {
		//alert user if no symbols page found
		alert("No Symbols Page Found!", "There is no page in this document named: "+symbolsPageName);
	}
}

function checkIfHasSymbolsPage(pages, symbolsPageName){

  var symbolPageCount = 0;

  for (var i = 0; i < pages.count(); i++){

    //reference each page
    var page = pages[i];

    //get the page name
    var pageName = [page name];

    //checks if the doc has a page with the name symbolsPageName
    if (pageName == symbolsPageName){
      symbolPageCount = symbolPageCount + 1;
    }
  }
  if(symbolPageCount > 0){
    return true;
  }else{
    return false;
  }
}

function organizeSymbols(doc, pages, symbolsPageName, symbolY, previousX, previousWidth, offset){
  //loop through the pages array
	for (var i = 0; i < pages.count(); i++){

		//reference each page
		var page = pages[i];

    //get the page name
    var pageName = [page name];

    //checks if the page name is Symbols
    if (pageName == symbolsPageName){

      //reference the artboards of each symbol
      var artboards = [page artboards];
      for (var z = 0; z < artboards.count(); z++){

        //reference each artboard of each page
        var artboard = artboards[z];

				//reference the artboard's frame
				var artboardFrame = artboard.frame();

				//set the Y
				artboardFrame.setY(symbolY);

				//set the X
				artboardFrame.setX(previousX + previousWidth + offset);

				//set the variables to the current artboards x and width so it's offset next time
				previousX = artboardFrame.x();
				previousWidth = artboardFrame.width();

      }
    }
	}
}
