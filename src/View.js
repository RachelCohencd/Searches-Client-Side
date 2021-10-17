import React, { useState } from "react";
import './View.css';



function View() {
    const[startDate,SetStartDate] =useState(null);
    const[endDate,SetEndDate] = useState(null);
    const [searchesArray,SetSerchesArray]= useState([])
    var category=new Array();
    category=['invoiceId','customerId','createdAt'];   
    var dateObject,currentDate;

    

    const SendDates=()=>{

        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
    "startDate":new Date(startDate).getTime() ,
    "endDate":new Date(endDate).getTime()
    });
    
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    fetch("http://localhost:4000/searches/startEnd", requestOptions)
    .then(response => response.text())
    .then(result => {
       GetData();
    })
    .catch(error => console.log('error', error));
    }
    const GetData=()=>{
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch("http://localhost:4000/searches", requestOptions)
                .then(response => response.json())
                .then(result => {
                    
                    result.serches.map(oneSearch=>{
                      dateObject=new Date(oneSearch[category[2]])
                       oneSearch[category[2]]=dateObject.toLocaleString()
                    })
                    SetSerchesArray([...result.serches]);
                })
                .catch(error => console.log('error', error));
           
        }
        
  return (
    <div className="View">
      <p>Yor Previous Searches </p>
      <input id="start" name="start" value={startDate} onChange={e => SetStartDate(e.target.value)} type="date"  placeholder="Start Date"></input>
      <input id="end" name="end" value={endDate} onChange={e => SetEndDate(e.target.value)} type="date"  placeholder="End Date"></input>
      <button onClick={()=>{ SendDates()}}>Search</button>
      <table >
                    <thead>
                    <tr>
                    {category.map(c=><th>{c}</th>)}
                    </tr>
                    </thead>
                    <tbody>

         {searchesArray.map(item => {return (<tr>{category.map(col=>{
           return<td>{item[col]}</td>})}</tr>)})}
                    </tbody>
                </table>
    </div>
  );
 
}


export default View;
