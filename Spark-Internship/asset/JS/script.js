function goBack() {
    window.history.back();
  }

let btn = document.getElementById('send-button');
btn.addEventListener('click',()=>{
  alert("Amount Transferred Successfully!!");
})


 
  
/************************************************************************************************************* */

const userList = document.querySelector('#user-list');

function renderUser(doc) {
  let li = document.createElement('tr');
  let name = document.createElement('td');
  let email = document.createElement('td');
  let balance = document.createElement('td');

 

  li.setAttribute('data-id', doc.id);
  li.setAttribute("data-name", doc.data().name);
  name.textContent = doc.data().name;
  email.textContent = doc.data().email;
  balance.textContent = doc.data().balance;

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(balance);

  userList.appendChild(li);
}

db.collection('user')
  .get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser(doc);
    });
  });


/********************************************************************************************************************* */

// let myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText);
/* let myAccountBalance = 5000
function sendMoney(){
   var enterName = document.getElementById("enterName").value;
   var enterAmount = parseInt(document.getElementById("enterAmount").value);

   if (enterAmount > 5000) {
      alert("Insufficient Balance.")
   } else {
      var findUserBankAccount = enterName + "BankBalance";
      var finalAmount = parseInt(document.getElementById(findUserBankAccount).innerHTML) + enterAmount;
      var myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText) - enterAmount
      document.getElementById("myAccountBalance").innerText = myAccountBalance
      document.getElementById(findUserBankAccount).innerHTML = finalAmount;
      alert(`Successful Transaction !!  
      $${enterAmount} is sent to ${enterName}@email.com.`)

      // transaction history 
      var createPTag = document.createElement("li");
      var textNode = document.createTextNode(`$${enterAmount} is sent to recepient with Email-id ${enterName}@email.com on ${Date()}.`);
      createPTag.appendChild(textNode);
      var element = document.getElementById("transaction-history-body");
      element.insertBefore(createPTag, element.firstChild);
   }
} */


const sendBtn = document.getElementById("send-button");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let senderName = document.getElementById("enterSenderName").value;
  let recepientName = document.getElementById("enterRecepientName").value;
  let amount  = Number(document.getElementById("enterAmount").value);

  let sender = document.querySelector(`[data-name=${senderName}]`);
  let receiver = document.querySelector(`[data-name=${recepientName}]`);

  console.log(sender,receiver);

  let senderId = sender.getAttribute("data-id");
  let receiverId = receiver.getAttribute("data-id");

  db.collection("user").doc(senderId).get().then((snapshot) => {
    let senderBalance = Number(snapshot.data().balance);
    db.collection("user").doc(senderId).update({
      balance : senderBalance - amount
    })
  })
  

  db.collection("user").doc(receiverId).get().then((snapshot) => {
    let receiverBalance = Number(snapshot.data().balance);
    db.collection("user").doc(receiverId).update({
      balance : receiverBalance + amount
    })
  })


  db.collection("history").add({
    from : senderName,
    to : recepientName,
    amount : amount,
  })
 /*  db.collection("user").doc(senderId).get().then((snapshot) => {
    var senderBalance = snapshot.data().balance;
  }).then(() => {
    db.collection("user").doc(senderId).update({
      balance : senderBalance - amount
    })
  })

  db.collection("user").doc(receiverId).get().then((snapshot) => {
    var receiverBalance = snapshot.data().balance;
  }).then(() => {
    db.collection("user").doc(receiverId).update({
      balance : receiverBalance + amount
    })
  }) */






})