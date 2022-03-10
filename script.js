// let checkTodo = document.querySelector(".checkbox-todo")
// let check = document.querySelector(".check")
// let image = document.querySelector(".check")

// check.addEventListener('click', ()=> {
//     if(checkTodo.checked){
//         check.classList.add(".light .check")
//     }
// })



// toggle theme

let checkboxToggle = document.querySelector(".checkbox-toggle");
let body = document.body;


checkboxToggle.addEventListener("change", function(){
    if(checkboxToggle.checked){
        body.classList.add("light")
        body.classList.remove("dark")
    }else{
        body.classList.add("dark")
    }
})







// add items to the database

function addItem(event){
    event.preventDefault()
    let inputValue = document.querySelector(".create_todo-input");
    console.log(inputValue.value);
    db.collection("todo-items").add({
        text: inputValue.value,
        status: "active"
    })

    inputValue.value = '';
}

// get items from database

function getItem(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        // console.log(snapshot);
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id : doc.id,
                ...doc.data()
            })
        })
        
        displayItems(items);
    })
}

// display item 

function displayItems(items){
  

    let itemsHtml = '';
    let itemRem = document.querySelector(".items-rem")
    
    items.forEach((item) => {
        itemsHtml += `
        <div class="todo-item">
        
        <div class="check">
        <div data-id=${item.id} class="check-mark ${item.status === "completed" ? "checked" : ""} ">
        ${item.status === "completed" ? '<img src="./images/icon-check.svg" alt=""></img>' : ""}
                    
                </div>
                </div>
                
                <div class="todo-showitem ${item.status === "completed" ? "strike" : ""} ">
                ${item.text}
                </div>
                
                <div data-id=${item.id} class="delete-item">
                <img src="/images/icon-cross.svg" alt="del-icon"></img>
                </div>
                
                </div>
                `
            })
        
            // console.log(items)
            
            itemRem.innerHTML = items.length + ' items left';
            document.querySelector(".todo-items").innerHTML = itemsHtml;
            
        createEventListeners();
        
    }
    
    
    
    
    
    
    // creating event listeners for check mark , clear and delete
    
    function createEventListeners(){
        let todoCheck = document.querySelectorAll(".todo-item .check .check-mark");
        let clear = document.querySelector('.clear-complete');
        
        todoCheck.forEach((check) => {
            check.addEventListener("click", function(){
                // console.log(check.dataset.id)
                markCompleted(check.dataset.id)
            })
            
            clear.addEventListener('click', function() {
                clearCompleted(check.dataset.id)
            })

            
            
        })
        
        let delItem = document.querySelectorAll(".todo-item .delete-item");
        delItem.forEach((del) => {
            del.addEventListener('click', function(){
                deleteItem(del.dataset.id)
            })
    })
}

function deleteItem(id){
    let del = db.collection("todo-items").doc(id);
    del.delete()
    
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    // console.log("item " + item)
    item.get().then(function(doc){
        if(doc.exists){
            let status = doc.data().status;
            // console.log(status)
            if(status === "active"){
                item.update({
                    status: "completed"
                })
            }
            else if(status === "completed"){
                item.update({
                    status: "active"
                })
            }
        }
    })
}

// clear the completed
function clearCompleted(id){
    let tb = db.collection('todo-items').doc(id)
    console.log("tb " + tb)
    tb.get().then(function (doc) {
        if(doc.exists){
            let status = doc.data().status;
            console.log("status " + status)
            if(status === "completed"){
                tb.delete()
            }
        }
    })
    
    
}


getItem()


// for sorting list

const dragArea = document.querySelector('.todo-items');
new Sortable(dragArea, {
    animation: 350,
    chosenClass: 'sort-chosen'
})



