function goBack() {
  window.history.back();
}

// const historyList = document.querySelector('#transaction');
let el = document.getElementById('list');

function renderHistory(doc) {
  let li = document.createElement('tr');
  let from = document.createElement('td');
  let to = document.createElement('td');
  let amount = document.createElement('td');

 

  li.setAttribute('data-id', doc.id);


  from.textContent = doc.data().from;
  to.textContent = doc.data().to;
  amount.textContent = doc.data().amount;

  li.appendChild(from);
  li.appendChild(to);
  li.appendChild(amount);

  el.appendChild(li);
}

db.collection('history')
  .get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderHistory(doc);
    });
  });