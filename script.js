let usersdata = JSON.parse(localStorage.getItem("usersdata"));
let dynamicdata = JSON.parse(localStorage.getItem("dynamicdata"))
let CBalance = 0;
let TInc = 0;
let TExpense = 0;
let TTransaction = 0;


let body = document.body;
let navName = document.getElementById('navName');
let CurrBalance = document.getElementById("CurrentBalance");
let TotalIncome = document.getElementById("TotalIncome");
let TotalExpense = document.getElementById("TotalExpences");
let TotalTransaction = document.getElementById("TotalTransaction");
let AddTransaction = document.getElementById("AddTransaction");
let ResetBtn = document.getElementById("rstbtn");
let foooter = document.querySelector("footer");
let form = document.querySelector(".form");
let box = document.querySelector("#box");
let main = document.querySelector("main");
const cards = document.querySelectorAll(".card");
const theme = document.querySelector(".theme");
const table = document.querySelector(".table");
const cashflow = document.querySelector(".cashflow");
const canvas = document.querySelector(".canvas");
const expanses = document.querySelector(".expanses");
const searchbar = document.querySelector(".searchbar");

let AddTransactionForm = document.querySelector("form");

let spentarea = document.getElementById("spentarea");
let description = document.getElementById("description");
let amountinput = document.getElementById("amoutinput");
let dateinput = document.getElementById("dateinput");
let category = document.getElementById("category");

// SETTING PAGE

let mainsetting = document.querySelector(".mainsetting");
let settingcard = document.querySelector(".settingcard");

let dashboardPage = document.querySelector("#dashboardPage");
let settingPage = document.querySelector("#settingPage");

let dashboardBtn = document.querySelector("#dashboardBtn");
let settingBtn = document.querySelector("#settingBtn");

let setdashboardBtn = document.querySelector("#setdashboardBtn");
let setsettingBtn = document.querySelector("#setsettingBtn");

// delete function
function deletedata(index) {
  alert("Are you sure you want to delete this transaction.")
  let dataarr = JSON.parse(localStorage.getItem("usersdata"));

  let filtereddata = dataarr.filter((elem, idx) => {
    if (idx !== index) {
      return elem;
    }
  });
  console.log(filtereddata);

  localStorage.setItem("usersdata", JSON.stringify(filtereddata));
  tabledata.innerHTML = "";
  displaydata();
  loadData()
}

// Edit function
let editIndex;

function editdata(index) {
  console.log(usersdata[index]);
  body.style.backgroundColor = "rgb(0,0,0,0.3)";
  form.style.display = "block";
  let dataarr = JSON.parse(localStorage.getItem("usersdata"));

  spentarea.value = dataarr[index].spentarea;
  description.value = dataarr[index].description;
  amountinput.value = dataarr[index].amountinput;
  dateinput.value = dataarr[index].dateinput;
  category.value = dataarr[index].category;

  editIndex = index;
  loadData()
}

// USERSDATA DISPLAYING  USING LOCAL STORAGE OR USING USERS ARRAY
if (usersdata !== null) {
  displaydata();
} else {
  usersdata = [];
}

// Form Handling Logic

AddTransactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editIndex === undefined) {
    let newuser = {
      spentarea: spentarea.value,
      description: description.value,
      amountinput: amountinput.value,
      dateinput: dateinput.value,
      category: category.value,
    };

    usersdata.push(newuser);
    localStorage.setItem("usersdata", JSON.stringify(usersdata));
    form.style.display = "none";
    body.style.display = "flex";
    body.style.backgroundColor = "white";
  } else {
    let dataarr = JSON.parse(localStorage.getItem("usersdata"));

    dataarr[editIndex] = { 
      spentarea: spentarea.value,
      description: description.value,
      amountinput: amountinput.value,
      dateinput: dateinput.value,
      category: category.value,
    };
    localStorage.setItem("usersdata", JSON.stringify(dataarr));
    form.style.display = 'none';
    body.style.display = 'white'
    body.style.backgroundColor = 'white'

  }

  tabledata.innerHTML = "";
  displaydata();
});


// displaydata function
function displaydata() {
  let dataarr = JSON.parse(localStorage.getItem("usersdata"));
  dataarr.forEach((value, index) => {
    tabledata.innerHTML += `
              <div>
                <p> ${value.dateinput} </p>
                <p> ${value.description} </p>
                <p> ${value.category} </p>
                <p> ${value.amountinput} </p>
                <span> 
                 <img onclick="editdata(${index})" src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzr9007JN5lIWDXxdS9KtVaJ2h-Ms5t-Uivem_ox6B0w&s=10"> 
                 <img onclick='deletedata(${index})' src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiKvtqFZmS74tqMk5fdXCJWx3qHeyMq1-G94CWUkpNsw&s=10">
                </span>
              </div>
  `;
  });
}

// Toggle - Page logic

function showDashboard() {
  dashboardPage.style.display = "flex";
  settingPage.style.display = "none";
  dashboardBtn.style.backgroundColor = "rgb(193, 215, 238)";
  setsettingBtn.style.backgroundColor = "white";
  console.log("Dashboard");
}

function showSetting() {
  dashboardPage.style.display = "none";
  settingPage.style.display = "flex";
  setsettingBtn.style.display = "rgb(193, 215, 238)";
  dashboardBtn.style.backgroundColor = "white";
  console.log("Setting");
}


//  LOAD DATA 

function loadData(){
    usersdata.forEach((elem)=>{
      // console.log(elem)
    CBalance += Number(elem.amountinput)
    // console.log(CBalance)

    if(elem.spentarea === 'Expense'){
      TExpense += Number(elem.amountinput);
    }else{
      TInc += Number(elem.amountinput);
    }
    
    let Name = JSON.parse(localStorage.getItem('navName'))
    console.log(Name)
    if(Name){
      navName.innerText = Name; 
    }

  })
  TotalIncome.innerText = `$${TInc}`
  TotalExpense.innerText = `$${TExpense}`
  CurrBalance.innerText = `$${TInc - TExpense}`; 
  TotalTransaction.innerText = usersdata.length

}

loadData()




// Form Cut Logic

let cross = document.getElementById("cross");
cross.addEventListener("click", () => {
  form.style.display = "none";
  body.style.display = "flex";
  body.style.backgroundColor = "white";
});

// THEME CHANGE LOGIC
let themebtn = document.querySelector("#toggle");
let flag = true;
let Theme = "light";

// Theme color logic
themebtn.addEventListener("click", (e) => {
  body.classList.toggle("dark");
  flag = !flag;
  Theme = "dark";

  if (flag) {
    Theme = "light";
    localStorage.setItem("Theme", Theme);
  } else {
    Theme = "dark";
    localStorage.setItem("Theme", Theme);
  }

  main.classList.toggle("blue");
  theme.classList.toggle("flashwhite");
  cards.forEach((card) => {
    card.classList.toggle("flashwhite");
  });

  table.querySelectorAll("p").forEach((p) => {
    p.classList.toggle("tabletext");
  });

  cashflow.classList.toggle("flashwhite");
  canvas.classList.toggle("blue");
  expanses.classList.toggle("flashwhite");
  searchbar.classList.toggle("black");
  mainsetting.classList.toggle("blue");
  settingcard.classList.toggle("flashwhite");
});

// Form Open Logic
AddTransaction.addEventListener("click", () => {
  form.style.display = "block";

  body.style.backgroundColor = "rgba(0,0,0,0.3)";
});

// let count = 0;
// TotalTransaction.innerText = count;
