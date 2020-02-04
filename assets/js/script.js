// ======================
// VARIABLES
// ======================

let budgetItems = JSON.parse(localStorage.getItem("budgetItems")) || [];
let lastID = parseInt(localStorage.getItem("lastID")) || 0;

// ======================
// FUNCTIONS  - reusables
// ======================
const updateStorage = () => {
  localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
  localStorage.setItem("lastID", lastID);
};
const renderItems = items => {
  if (!items) items = budgetItems;
  const tbody = $("#budgetItems tbody");
  tbody.empty();
  for (const { id, date, name, category, amount, notes } of items) {
    const row = `<tr data-id=${id}>
    <td>${date}</td>
    <td>${name}</td>
    <td>${category}</td>
    <td>$${parseFloat(amount).toFixed(2)}</td>
    <td>${notes}</td>
    <td class="delete"><span>x</span></td></tr>`;
    tbody.append(row);
  }
  const total = items.reduce((accum, item) => {
    return accum + parseFloat(item.amount);
  }, 0);
  $("#total").text(`$${total.toFixed(2)}`);
};
// ======================
// MAIN PROCESS
// ======================
renderItems();
$("#toggleFormButton,#hideForm").on("click", function() {
  const addItemForm = $("#addItemForm");
  addItemForm.toggle("slow", () => {
    $("#toggleFormButton").text(
      addItemForm.is(":visible") ? "Hide Form" : "Enter New Budget Items "
    );
  });
});
$("#addItem").on("click", function() {
  event.preventDefault();
  const newItem = {
    id: ++lastID,
    date: moment().format("lll"),
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
  budgetItems.push(newItem);
  updateStorage();
  renderItems(budgetItems);
  $("#addItemForm form")[0].reset();
  $("#categoryFilter").val("");
});
$("#categoryFilter").on("change", function() {
  const category = $(this).val();
  if (category) {
    const filteredItems = budgetItems.filter(
      item => category === item.category
    );
    renderItems(filteredItems);
  } else {
    renderItems();
  }
});
$("#budgetItems").on("click", ".delete span", function() {
  const id = parseInt(
    $(this)
      .parents("tr")
      .data("id")
  );
  const remainingItems = budgetItems.filter(item => item.id !== id);
  budgetItems = remainingItems;
  updateStorage();
  renderItems();
  $("#categoryFilter").val("");
});
