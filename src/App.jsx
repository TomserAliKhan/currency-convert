import { useState,useEffect } from 'react'
import './App.css'





function App() {
const[convertVal, setConvertVal] = useState(false)
const [apiRes, setApiRes] = useState('')
const [inpFrom, setInpFrom] = useState('1') 
const [inpTo, setInpTo] = useState('') 
const [optionFrom, setOptionFrom] = useState("USD")
const [optionTo, setOptionTo] = useState("INR")
const [option, setOption] = useState([])
const [loding, setLoding] = useState(false)
const [error, seterror] = useState('')

let API=`https://v6.exchangerate-api.com/v6/756f0ccf6b88ab43397a3665/latest/${optionFrom}`




function apiFeach(){
   setLoding(true)
   seterror('')

  fetch(API)
  .then(res=>{

   return res.json();
  })
  .then(data=>{
    
   
  let {conversion_rates}=data;
  
    setApiRes(conversion_rates)
    showdata(apiRes)
    
    return conversion_rates;
  })
  .then(dat=>{let all= Object.keys(dat)
      setOption(all)
    
    
    setLoding(false)
    
  })
  .catch(err=>{
   seterror(err)
   setLoding(false)
  })


}
function showdata (res){

  let currencyFromInp=inpFrom;
  let currencyToOption=res[optionTo];
  let ans=currencyFromInp * currencyToOption;
  setInpTo(ans.toFixed())
  



 

 
}







useEffect(() => {
  apiFeach()
  }, [convertVal])




  return (
    <>
    <div className="bg-slate-900 h-[100vh] flex w-full
     justify-center items-center px-3">
  <div className='water min-h-[50%] min-md:w-[90%]  rounded-3xl px-5 flex flex-col'>
      
      <h1 className=' text-3xl w-full text-center py-5 font-bold'>Currency converter</h1>


      <label htmlFor="number"className=' text-[20px] ' >From</label>
        <div className='flex items-center justify-between'>
        <input type="number"placeholder='Input' value={inpFrom} className='h-10 outline-none rounded-xl px-4 text-[20px] text-center my-2 w-[70%]' 
        onChange={(e)=>setInpFrom(e.target.value)}
        />
        
        <select name="" id="" className='h-10 text-[15px] rounded-xl w-[20%] text-center'
         onChange={(e=>setOptionFrom(e.target.value)) }
        >
            <option value={optionFrom}
         
        >{optionFrom}</option>
        
           {
            option
       
            .map((e,i)=>{
              return(
                
                <option value={e} key={i} >{e}</option>
              )
            })
          }
          </select>


        </div>
          <label className=' text-[20px] ' >To</label>
        <div className='flex items-center justify-between'>
        <input type="number"placeholder='Output' className='h-10 outline-none rounded-xl px-4 text-[20px] text-center my-2 w-[70%]' 
        value={inpTo}
        readOnly 

        onChange={(e=>setInpTo(e.target.value))}
        />
        
        <select name="" id="" className='h-10 text-[15px] rounded-xl w-[20%] text-center'
          onChange={(e)=>{setOptionTo(e.target.value) }}
        >
          <option value={optionTo}
         
          >{optionTo}</option>
          {
            option
            
            .map((e,i)=>{
              return(
                <option value={e} key={i}>{e}</option>
              )
            })
          }
          </select>
        </div>


        <button className=' hover:bg-gray-950 hover:text-white border-green-500  bg-slate-900 my-8 h-10 rounded-2xl text-2xl text-green-600'
       onClick={()=>setConvertVal((e)=>!e)}
        >Convert</button>

        <div className='w-full text-center text-red-500 text-2xl py-3'>{loding ? (<p>Loding....</p>):('')}</div>

         <div className='w-full text-center text-red-500 text-2xl py-3'>{error ? (<p>{` ${error}`}</p>):('')}</div>


    </div>
     


    </div>   
    
    </>
  )
}

export default App
