class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  // submit budget method
  submitBudgetForm() {
    const budgetValue = this.budgetInput.value;
    if (!budgetValue || budgetValue < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p> value cannot be empty or negative</p>`;
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove("showItem");
      }, 2000);
    } else {
      this.budgetAmount.textContent = budgetValue;
      this.budgetInput.value = "";
      this.showBalance();

    }
  }
  // show/update balance
  showBalance() {
    const expenses = this.totalExpenses();
    const total = parseInt(this.budgetAmount.textContent) - expenses;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (total === 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }
  // submit expense

  submitExpenseForm() {
    // expense name
    const expenseValue = this.expenseInput.value;
    // expense value
    const amountValue = this.amountInput.value;
    if (!expenseValue || !amountValue || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      const self = this;
      setTimeout(function() {
        self.expenseFeedback.classList.remove("showItem");
      }, 2000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      }
      this.itemID++;
      this.itemList.push(expense);

      // add expense to the list
      this.addExpense(expense);

      // update balance
    }
  }

  // add expense to the list
  addExpense(expense) {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense");
    expenseItem.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
             <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
             <h5 class="expense-amount mb-0 list-item">£${expense.amount}</h5>

             <div class="expense-icons list-item">

              <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
               <i class="fas fa-edit"></i>
              </a>
              <a href="#" class="delete-icon" data-id="${expense.id}">
               <i class="fas fa-trash"></i>
              </a>
             </div>
           </div>`;
    this.expenseList.appendChild(expenseItem);
  }

  // calculate total expenses
  totalExpenses() {
    let total = 500;
    return total;
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  // new instance of UI
  const ui = new UI();

  // budget form submit
  budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  // expense form submit
  expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });

  // expense edit/delete
  expenseList.addEventListener("click", function() {

  });

}

document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
