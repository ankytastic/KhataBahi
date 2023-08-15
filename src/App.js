import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [datetime,setDatetime]=useState('');
  const [description,setDescription]=useState('');
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response=await fetch(url);
    return await response.json(); 
  }

  function formatDateTime(datetime) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, 
    };
    const dateObject = new Date(datetime);
    return dateObject.toLocaleString('en-GB', options).replace(',', '');
  }
  

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({name,price,datetime,description}),          
    })
      .then((json) => {
        setName('');
        setPrice('');
        setDatetime('');
        setDescription('');
        getTransactions().then(setTransactions);
    });
  }
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }

  return (
    <main>
      <h1>₹{balance}</h1>
      <form 
      onSubmit={addNewTransaction}
      >
        <div className='basic'>
        <input type="text" 
          value={name}
          onChange={ev=>setName(ev.target.value)}
          placeholder={'Maggi'} 
        />
        <input type="number" 
          step=".01"
          value={price}
          onChange={ev=>setPrice(ev.target.value)}
          placeholder={'₹-37'} 
        />
        <input type="datetime-local" 
          value={datetime}
          onChange={ev=>setDatetime(ev.target.value)}
        />
        </div>
        <div className='description'>
        <input type="text" 
          value={description}
          onChange={ev=>setDescription(ev.target.value)}
          placeholder={'Description'} 
        />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length>0 && transactions.map(transaction=>(
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price "+(transaction.price<0?'red':'green')}>
              ₹{transaction.price}
            </div>
            <div className="datetime">{formatDateTime(transaction.datetime)}</div>
          </div>
        </div>
        ))}
        </div>
    </main>    
  );
}

export default App;
