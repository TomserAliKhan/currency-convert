import React, { useEffect } from "react";
import { ContexData } from "../contex/Contex";
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";




let API=import.meta.env.VITE_API_URL;


const App = () => {
  const [ans, setAns] = useState("G-E-R");
  const [input, setInput] = useState(1);
  const [fromOption, setFromOption] = useState();
  const [toOption, setToOption] = useState();
  const [Data,setData]=useState('')
  const [isLoding,setIsLoding]=useState(false)
  const [active, setactive] = useState(false);


  
 let option=[
  "select",
  "INR","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD",
  "BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD",
  "CAD","CDF","CHF","CLF","CLP","CNH","CNY","COP","CRC","CUP","CVE","CZK","DJF",
  "DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP",
  "GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS",
  "IMP","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF",
  "KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA",
  "MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN",
  "NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR",
  "RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL",
  "SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD",
  "TVD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF",
  "XCD","XCG","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL",
]
let clickCalculate=()=>{
   let toAns=Data[toOption] ;
   let curent=Data[fromOption];
 let inp=Number(input)
 let finalans=inp*toAns
  {
    if (curent!==undefined){
  inp!==undefined ?  setAns(`${fromOption}:${curent} =${toOption}: ${finalans}`):''
  }else{
      toast.error('Please Get Exchange Rate!')
      
  }
 }

}
let calculate=()=>{
  let curent=Data[fromOption];
  let toAns=Data[toOption] ;
   {
  curent!==undefined ?  setAns(`${fromOption}:${curent} =${toOption}: ${toAns}`):''
 }
 
  
}

useEffect(calculate,[Data])

  let apiCall=async()=>{
    setIsLoding(true)
    // Create loading toast
    const loadingToastId = toast.loading('Fetching exchange rates...');
    
    try{
      if (toOption  ==='') {
        toast.update(loadingToastId, {
          render: 'Please select a currency!',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
        return;
      }
      
      let res = await axios.get(API+fromOption);
      setData(res.data.conversion_rates)
      
      // Update loading toast to success
      toast.update(loadingToastId, {
        render: 'Exchange rates fetched successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    }
    catch(err){
      // Update loading toast to error
      toast.update(loadingToastId, {
        render: err.message || 'Failed to fetch exchange rates',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
    finally {
      setIsLoding(false)
    }
}
  

const swap = () => {
  // Use a temporary variable so we swap current values reliably
  
  setFromOption(toOption)
  setToOption(fromOption)

}
  

   
    
 
  

//useEffect(apiCall,[])
const convert= ()=>{
     apiCall();
  
  
    
}


let props={setFromOption,setToOption}

  return (
    <ContexData.Provider value={props}>
      <div className=" h-screen  bg-[#450693]/80 flex justify-center items-center">
        <section className="h-[410px] w-[90%]  lg:w-[60%] lg:h-[56%] rounded-2xl bg-white">
      
   <div>
 
      <ToastContainer />
    </div>
          <h1 className="text-center text-2xl font-bold py-3 border-b-[1.5px] border-gray-300">
            Currency Converter
          </h1>

          <div className="flex flex-col items-center p-7 pt-5 ">
            <label htmlFor="input" className=" self-start font-semibold">
              {" "}
              Enter Amount
            </label>
            <input
              type="text"
              name=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
              id="input"
              className="w-full  p-2 m-2 border-[1.5px] border-gray-500/55 shadow-sm outline-none rounded-lg "
              placeholder="Enter"
            />

            <div className="flex justify-between w-full py-2">
              <h1 className="font-semibold">From</h1>
              <h1 className="w-16 text-start font-semibold">To</h1>
            </div>
            <div className="flex justify-between w-full">




<div className="flex relative">
      <select
        className="p-1 w-20   bg-white border  border-gray-500/55 rounded-md appearance-none lg:w-20"
        value={fromOption}
        onClick={() => setactive((e) => !e)}
        onChange={(e)=>setFromOption(e.target.value)}
        
      >
      
        {
          option.map((v,i)=>{
            return <option value={v} key={i} >{v}</option>
          })
        }
      </select>
      <div
        className={`${
          active ? "rotate-180" : ""
        } absolute inset-y-0  pointer-events-none right-0 flex items-center mx-2 `}
      >
        <svg
          className="w-4 h4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>



              <button
               onClick={()=>swap()}
              >
                <img
               
                  src="https://static.thenounproject.com/png/swap-icon-1259591-512.png"
                  alt="Swap"
                  className="w-10 active:border active:scale-95 rounded-md border shrink-0"
                />
              </button>
<div className="flex relative">
      <select
        className="p-1 w-20   bg-white border  border-gray-500/55 rounded-md appearance-none lg:w-20"
        value={toOption}
        onClick={() => setactive((e) => !e)}
          onChange={(e)=>setToOption(e.target.value)}
        
        
      >
        
        {  option.map((v,i)=>{
            return <option value={v} key={i} >{v}</option>
          })}
      </select>
      <div
        className={`${
          active ? "rotate-180" : ""
        } absolute inset-y-0  pointer-events-none right-0 flex items-center mx-2 `}
      >
        <svg
          className="w-4 h4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>






            </div>
           <div className="self-start py-3 text-[20px] whitespace-nowrap lg:text-2xl font-semibold"> 
            {ans}
           </div>

 <button   className='active:scale-95  w-1/3 bg-[#1c0866]/80 rounded text-center py-2 text-white mt-3 cursor-pointer'
            onClick={()=>clickCalculate()}
            >
          Calculate 
            </button>



            <button  className="active:scale-95 active:bg-[#1c0866]/40 w-full bg-[#1c0866]/80 rounded text-center py-2 text-white my-3 cursor-pointer"
            onClick={()=>convert()}
            >
              Get Exchange Rate
            </button>
           
          </div>
        </section>
      </div>
    </ContexData.Provider>
  );
};

export default App;
