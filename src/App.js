
import './App.css';
import React, {useState,useEffect} from "react";
import Axios from 'axios';
var count=0,colorcheck=0;
function App() {
    const [name ,setName]=useState('');
     //const[nameList,setNameList]=useState([]);
     const [nameList, updateNameList] =useState([]);
     const [col,setCol]=useState("style1");
     const [passion,setPassion]=useState("style1");
     const [year,setYear]=useState("style1");
     const [hobby,setHobby]=useState("style1");
     const [hobbies, updateHobbies ]=useState([]);
     const [addhoblist,updateAddHob]=useState([])

  useEffect(()=>{
   if(count===0){
    Axios.get("http://localhost:3001/getusers").then((res)=>{
        console.log(res.data);
        var list=[];
        for(var i=0;i<res.data.length;i++){
          var obj=res.data[i];
           list[i]={id:obj.id,name:obj.name,col:col};
        }
       
        updateNameList(list);
    
      }); 
     count=1;
    }
    });

   const userclick=(id)=>{
    // console.log(id);
    var list=[];
    colorcheck=id;
    updateNameList([]);
    var list=[];
    for(var i=0;i<nameList.length;i++){
      var obj=nameList[i];
      if(id===obj.id){
        list[i]={id:obj.id,name:obj.name,col:"style1click"};
      } 
      else{
      list[i]={id:obj.id,name:obj.name,col:col};
      }
    }
     updateHobbies([])
    updateNameList(list);
    
    Axios.post("http://localhost:3001/gethobby",{uid:id }).then((res)=>{
      var e={id:res.data.id,uid:id,passion:passion,year:year,hobby:hobby};
      updateHobbies([]) 
      updateHobbies(res.data);
      updateAddHob([e]) 
      });  
  
  }

    const adduser =()=>{

     
      
      if (window.confirm('Are you sure you wish save this  user?')){
         Axios.post("http://localhost:3001/adduser",{name:name }).then((res)=>{
          var e={id:res.data.id,name:name};
          updateNameList([...nameList,e]);
          });  
      }
   
   
   
    };

   const addhobby=()=>{
    // console.log(passion);
   if(passion.startsWith("Se")){
   alert("Please select a passion");
  }
    else if( passion.startsWith("s")||hobby.startsWith("s")||year.startsWith("s")){
      alert("Please enter correct info");
   }
   else{
  if (window.confirm('Are you sure you wish save this  Hobby?')){
    updateAddHob([]);    
    Axios.post("http://localhost:3001/addhobby",{uid:colorcheck,passion:passion,hobby:hobby,year:year }).then((res)=>{
          var e={id:res.data.id,uid:colorcheck,passion:passion,hobby:hobby,year:year};
          updateHobbies([...hobbies,e]);
         updateAddHob([e]);  
        });  
      }
    
   }
  }
   const delet=(id)=>{
     
     if (window.confirm('Are you sure you wish to delete this Hobby?')){
      Axios.post("http://localhost:3001/delete",{id:id }).then((res)=>{
      // var e={id:res.data.id,uid:colorcheck,passion:passion,hobby:hobby,year,year};
      var temp=[];
      for(var i=0;i<hobbies.length;i++){
       var obj=hobbies[i];
      
        if(obj.id===id){
        }
        else{
             temp.push(obj);
        }
        
      }
      updateHobbies(temp);
       
      });  
     }
   }
  
  return (
    
    <div className='splitScreen'>

<div className="topPane">
<h1>User Hobbies</h1>
<table className='table' >
<tbody>
    <tr>
         <td>
     
        <div>
         <input type="text" className="input" placeholder="Enter User Name" onChange={(e)=>
        {
         setName(e.target.value);
        }}>

        </input>
         <button className="btnadd" onClick={adduser}>Add</button>
         </div> 
       
       </td>
   </tr>
   </tbody>
   </table>
      { nameList.map((value)=>{
     
     return(
      <table className='table'>
        <tbody>
          <tr>
            {
             
            }
             <td className={value.col} key={value.id} onClick={() => userclick(value.id)}>
               <label className="style" >{value.name}</label>
             
             </td>
          </tr>
        </tbody>
      </table>
     )
     })
}
</div>
<div className="bottomPane">
   {
     addhoblist.map((value)=>{
      return(
            
        <div >
          <tr className='test'>
            <td  >

          
      <select   className="sel" onChange={(e)=>{setPassion(e.target.value)}} >
      <option value='Select' >Select Passion</option>
  <option   className="sel" value="Low">Low</option>
  <option   className="sel" value="Medium">Medium</option>
  <option   className="sel" value="High">High</option>
</select>
</td>
<td>    
               <input className='inputhob' placeholder='Enter Hobby'
               onChange={(e)=>
                {
                 setHobby(e.target.value);
                }}
               ></input>
              </td>  
              <td>
               <input  className="inputyear" placeholder='Enter Year'
               onChange={(e)=>
                {
                 setYear(e.target.value);
                }}
               ></input>
               </td>
               <td>
                 <button className="btn" onClick={addhobby}>Add</button>
                 </td>
          </tr>
                 </div>
    
      )
     })
    }
    {
     hobbies.map((value)=>{
       return(
          

       
     
              <div >

                
                 <tr>
                <td div className='test'> 
             <label  className='td2'>
               {value.passion}
               </label>
             
             
              <label  className='td3'>
               {value.hobby}
              </label>
             
              <label  className='td4'>
               {value.year}
              </label>
              
                 <label onClick={() => delet(value.id)}  className="btndel" >Delete</label>
                 
                 </td>
                 </tr>
                </div>
                
            
               

       );
     })

   }
</div>
  </div>
    
   
  );
}

export default App;
