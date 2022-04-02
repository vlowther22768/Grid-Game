"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Tutorial Case

   Author: 
   Date:   

   Global Variables
   ================
   
   puzzleCells
      References the TD cells within the Hanjie table grid.
   
   cellBackground
      Stores the current background color of the puzzle
      cells during the mouseover event.
      
      
   Function List
   =============

   init()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   swapPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e)
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e)
      Extends the background color of the original puzzle cell during
      the mouseenter event.
      
   endBackground()
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.

     */
	







         
/* ================================================================= */
// run the init() function when the page loads
 window.onload = init;

let puzzleCells;
let cellBackground;
 //Defintion of init() function
      function init() {
      // Insert the title fo the first puzzle
      document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";

      //Insert th Html code for the first puzzle table
      document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

      // Add event handlers for the puzzle buttons
      let puzzleButtons = document.getElementsByClassName("puzzles");

      //loop through the puzzleButtons array to add event handlers to each element
      for(let i = 0; i < puzzleButtons.length; i++) {
         puzzleButtons[i].onclick = swapPuzzle;
      }

       // call the setupPuzzle() function
         setupPuzzle();

         document.addEventListener("mousup", endBackground);
      }// end of init() function

      // Definition of the swapPuzzle() function
      function swapPuzzle(e) {
        if (confirm("You will lose all of your work on the puzle! Continue?")) {
         let puzzleID = e.target.id;
         let puzzleTitle = e.target.value;
         document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

         //switch statment to determine which puzzleID triggered this function
         switch(puzzleID) {
            case "puzzle1":
               document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
                  break;
            case"puzzle2": 
                     document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
                     break;
            case "puzzle3":
                      document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
                     break;
         }// end of switch statment
         // call the setupPuzzle() function
         setupPuzzle();
         }
      }
      //Add an event listener for the mouseup event
      document.addEventListener("mouseup", endBackground);

      //Add an event listener for the mouseup event
      document.getElementById("solve").addEventListener("click", function() {
         //Remove an the inline background color style from each cell
         for(let i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].style.backgroundColor = "";
         }
      });
     
      //Defintion of the setupPuzzle()function
      function setupPuzzle() {
         // Match all of the data cells in the puzzle
         puzzleCells = document.querySelectorAll("table#hanjieGrid td");

         // Loop through the puzzleCells array set the color of each cell to gold
         for(let i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
            // set the cell background color in response to the musrdown eveent
            puzzleCells[i].onmousedown = setBackground;
            //use a pencil image as the cursor
            puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
         } //end of the for loop   
         
         //Check the puzle solution
         document.getElementById("hanjieGrid").addEventListener("mouseup", function() {
            let solved = true;
            // loop through the whole puzzle checking each cell against the solution
            for (let i = 0; i < puzzleCells.length; i++) { if ((puzzleCells[i].clasName === "filled" && puzzleCells
            [i].style.backgroundColor !== "rgb(101, 101, 101)")|| (puzzleCells[i].clasName === "empty" &&
            puzzleCells [i].style.backgroundColor !== "rgb(101, 101, 101)")) {
               solved = false;
            break;
               }// end of if statement
            }// end of for loop
            if(solved) {
               alert("You Solved the Puzzle!!!!");
            }
         });

         //Create object collections of the filled and empty cells
         let filled = document.querySelectorAll("table#hanjieGrid td.filled");
         let empty = document.querySelectorAll("table#hanjieGrid td.empty");

         //create an event listener to highlight incorrect cells
         document.getElementById("peek").addEventListener("click", 
            function() {
            for (let i = 0; i < filled.length; i++) {
               if (filled[i].style.backgroundColor ==="rgb(255, 255, 255)") {
                  filled[i].style.backgroundColor = "rgb(255, 211, 211)";
               }

            }
            // Display inccorrect gray cells in red
            for(let i = 0; i < empty.length; i++) {
               if (empty[i].style.backgroundColor === "rgb(101, 101, 101)") {
                  empty[i].style.backgroundColor = "rgb(255, 101, 101)";
               }
            }
            // Remove the color hints after 0.5 seconds
            setTimeout(
               function(){ for (let i = 0; i < puzzleCells.length; i++) {
                  if (puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)") {
                     puzzleCells[i].style.backgroundColor = "rgb(255, 101, 101)";
                  }
                  if (puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)") {
                     puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
                  }
               }

               }, 500); //end of setTimeout
         });
      }// end of setupPuzzle()

      //Definition of the SetBackground() function
      function setBackground(e) {
         let cursorType;
        // Set the background color based on the keyboard the keyboard key
         if (e.shiftKey) {
            cellBackground = "rgb(233, 207, 29)";
            cursorType = "url(jpf_eraser.png), cell";
         } else if (e.altKey) {
            cellBackground = "rgb(255, 255, 255)";
            cursorType = "url(jpf_cross.png), crosshair";
         } else {
            cellBackground = "rgb(101, 101, 101)";
            cursorType = "url(jpf_pencil.png), pointer";
         }

         e.target.style.backgroundColor = cellBackground;

         // Loop through and create an event listener for every puzzle cell
         for(let i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].addEventListener("mouseenter", extendBackground);
            puzzleCells[i].style.cursorType = "url(jpf_pencil.png), pointer";
         }// END OF LOOP

         // Prevent the default action of selecting table text
         e.preventDefault();
      }// end of setBackground() function

      // Definition of the extendBackground() function
      function extendBackground(e) {
         e.target.style.backgroundColor = cellBackground;
      }

      // Definitioon of the endBackground() function
      function endBackground() {
         // Remove the event listener for every puzzle cell
         for (let i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].removeEventListener("mouseenter", extendBackground);
         }// end of for loop
      }//end of endBackground() function

function drawPuzzle(hint, rating, puzzle) {
   
   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}