// ======================
// VARIABLES   - global variables
// ======================

// 1st: pull initial budgetItems/lastID from localStorage to set initial variables  15:33 min to 26:30
const budgetItem = JSON.parse(localStorage.getItem("budgetItems")) || [];
// in local storage this is a string so make it into a number
let lastID = parseInt(localStorage.getItem("lastID")) || 0;

// ======================
// FUNCTIONS  - reusables
// ======================

// 4th: function to update localStorage with latest budgetItems and latest lastID

// 5th: function to render budgetItems on table; each item should be rendered in this format:
// <tr data-id="2"><td>Oct 14, 2019 5:08 PM</td><td>November Rent</td><td>Rent/Mortgage</td><td>1300</td><td>Fill out lease renewal form!</td><td class="delete"><span>x</span></td></tr>
// also, update total amount spent on page (based on selected category):

// ======================
// MAIN PROCESS
// ======================

// 2nd: wire up click event on 'Enter New Budget Item' button to toggle display of form  26:30 to  1:00

//jquery way - dont use a fat arrow here it will mess up "this" in a jquery click event
$("#toggleFormButton,#hideForm").on("click", function() {
  const addItemForm = $("#addItemForm");
  // const toggleButton = $("#toggleFormButton");

  // addItemForm.toggle("slow", () => {
  //   if (addItemForm.is(":visible")) {
  //     toggleButton.text("Hide Form");
  //   } else {
  //     toggleButton.text("Enter New Budget Item");
  //   }
  // });
  //////// Annes refactor using terrnary operater
  // addItemForm.toggle("slow", () => {
  //   addItemForm.is(":visible")
  //     ? toggleButton.text("Hide Form")
  //     : toggleButton.text("Enter New Budget Item");
  // });
  ///// Sarahs refactor - consider is this over use of ternary ?  will it be readable and understandable to myself and others later ?  Can go too far on ternarys

  // addItemForm.toggle("slow", () => {
  //   toggleButton.text(
  //     addItemForm.is(":visible") ? "Hide Form" : "Enter New Budget Items "
  //   );
  // });

  // now get rid of consts that are not needed casue they are used only one time
  addItemForm.toggle("slow", () => {
    $("#toggleFormButton").text(
      addItemForm.is(":visible") ? "Hide Form" : "Enter New Budget Items "
    );
  });
});

// 3rd: wire up click event on 'Add Budget Item' button, gather user input and add item to budgetItems array
// (each item's object should include: id / date / name / category / amount / notes)... then clear the form
// fields and trigger localStorage update/budgetItems rerender functions, once created

// 6th: wire up change event on the category select menu, show filtered budgetItems based on selection

// 7th: wire up click event on the delete button of a given row; on click delete that budgetItem
