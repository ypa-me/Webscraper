'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function process(){
    const [loading, setLoading]= useState(false)
    const [result, setResult] = useState(null)
    const[inputValue, setInputValue] =useState('');
    const router = useRouter();
    const [progress, setProgress] = useState(0);  
    const [status, setStatus] = useState('');     
    

    const handleaction = async () =>{
        setLoading(true);
             
        
        

        const url = inputValue;
        
        alert("Initialising... This may take a while.")
        const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`)
        const data = await response.json();
        router.push(`/result?url=${encodeURIComponent(url)}`);
        
        setResult(data);
        
        setLoading(false);

    }
    return (
    <div>
      
      <main className="flex min-h-screen w-full flex-col items-center gap-25 justify-top align-center py-32 px-16 bg-white dark:bg-black ">
        
        
        <div className="flex flex-col items-center gap-6 text-center ">
          
          <h2 className="max-w-s text-3xl  leading-10 tracking-tight text-black dark:text-zinc-50">
            Start by entering the link of the website that you wish to scrape below.
          </h2>

          
        </div>
        <div >
            <input
            type="text"
            placeholder="Enter link here..."
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            className="w-200 border-1 rounded-md h-10"
            >
            </input>
          <Link href="/process">
            <button
            onClick={handleaction} 
            className=" rounded-md h-10 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300">
              Scrape
            </button>
          </Link>



        </div>
        
        <div className="flex flex-col items-center gap-10 text-center ">
          <h3 className="max-w-s text-2xl  leading-10 tracking-tight text-gray-900 dark:text-zinc-50">
            Please follow these guidelines while scraping websites:
          </h3>

          
          
          <ul>
            <li>Scrape only publicly available websites.</li>
            <li>Follow <a href="https://en.wikipedia.org/wiki/Robots.txt">robots.txt</a> guidelines.</li>
            <li>Do not use this website for any illegal activities.</li>
            <li>Do not overload the servers.</li>
            <li> Scrape only HTML websites (still working on dynamic sites scraping).</li>
          </ul>

          
        </div>
          
        
        
      </main>
    </div>
  );
}