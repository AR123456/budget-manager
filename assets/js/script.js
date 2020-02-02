// ======================
// VARIABLES   - global variables
// ======================

// 1st: pull initial budgetItems/lastID from localStorage to set initial variables  15:33 min to 26:30
const budgetItems = JSON.parse(localStorage.getItem("budgetItems")) || [];
let lastID = parseInt(localStorage.getItem("lastID")) || 0;

// ======================
// FUNCTIONS  - reusables
// ======================

// 4th: function to update localStorage with latest budgetItems and latest lastID  1:35 to 1:38
// cannot update more than one value at a time  and it has to be a string
const updateStorage = () => {
  localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
  localStorage.setItem("lastID", lastID);
};
// 01:38 to 2:06 res start at 2:06 for getting total
//https://codingbootcamp.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=20a3a525-7333-4de6-9c47-ab4d0018f8d7
// 5th: function to render budgetItems on table; each item should be rendered in this format:
// <tr data-id="2"><td>Oct 14, 2019 5:08 PM</td><td>November Rent</td><td>Rent/Mortgage</td><td>1300</td><td>Fill out lease renewal form!</td><td class="delete"><span>x</span></td></tr>
// also, update total amount spent on page (based on selected category):
const renderItems = items => {
  if (!items) items = budgetItems;
  const tbody = $("#budgetItems tbody");
  tbody.empty();
  // destructure in the for loop
  for (const { id, date, name, category, amount, notes } of items) {
    const row = `<tr data-id${id} ><td>${date}</td><td>${name}</td><td>${category}</td><td>$${parseFloat(
      amount
    ).toFixed(
      2
    )}</td><td>${notes}</td><td class="delete" ${id}<span>x</span></td></tr>`;
    tbody.append(row);
  }
};
// ======================
// MAIN PROCESS
// ======================
renderItems();

// 2nd: wire up click event on 'Enter New Budget Item' button to toggle display of form  26:30 to  1:00

//jquery way - dont use a fat arrow here it will mess up "this" in a jquery click event
$("#toggleFormButton,#hideForm").on("click", function() {
  const addItemForm = $("#addItemForm");
  addItemForm.toggle("slow", () => {
    $("#toggleFormButton").text(
      addItemForm.is(":visible") ? "Hide Form" : "Enter New Budget Items "
    );
  });
});
// starting at 1:03 in mp4 end at 1:35
//https://codingbootcamp.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=20a3a525-7333-4de6-9c47-ab4d0018f8d7
// 3rd: wire up click event on 'Add Budget Item' button, gather user input and add item to budgetItems array
// (each item's object should include: id / date / name / category / amount / notes)... then clear the form
// fields and trigger localStorage update/budgetItems rerender functions, once created

$("#addItem").on("click", function() {
  event.preventDefault();

  const newItem = {
    id: ++lastID, // increment and store the incremented value in one step
    date: moment().format("lll"), // from moment JS
    name: $("#name")
      .val()
      .trim(),
    category: $("#category").val(),
    amount: $("#amount")
      .val()
      .trim(),
    notes: $("#notes")
      .val()
      .trim()
  };
  if (!newItem.name || !newItem.category || !newItem.amount) {
    alert("something was not filled out ");
    return false;
  }
  // console.log(newItem);
  budgetItems.push(newItem);
  console.log(budgetItems);
  // update local storage
  updateStorage();
  // & re render budget items
  renderItems(budgetItems);
  // clear out the form 1:29 1:35
  $("#addItemForm form")[0].reset();
});

// 6th: wire up change event on the category select menu, show filtered budgetItems based on selection

// 7th: wire up click event on the delete button of a given row; on click delete that budgetItem
// renderItems();
