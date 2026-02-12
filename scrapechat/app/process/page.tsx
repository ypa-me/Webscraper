'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function process(){
    const[inputValue, setInputValue] =useState('');

    const handleaction = () =>{
        console.log("User entered:", inputValue);
        alert("The script was triggered.");
        //script logic goes here
    }
    return (
    <div>
      
      <main className="flex min-h-screen w-full flex-col items-center justify-top align-center py-32 px-16 bg-white dark:bg-black ">
        
        
        <div className="flex flex-col items-center gap-6 text-center ">
          <h1 className="text-5xl tracking-tight text-black dark:text-zinc-50">
            ScrapeChaynmtrynrtyhntsnrsht
          </h1>

          <h3 className="max-w-xs text-3xl  leading-10 tracking-tight text-black dark:text-zinc-50">
            Your all-in-one webscraping solution.
          </h3>

          
        </div>
        <div>
            <input
            type="text"
            placeholder="Enter link here..."
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            >
            </input>
          <Link href="/process">
            <button
            onClick={handleaction} 
            className="mt-10 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300">
              Get Started
            </button>
          </Link>


        </div>
          
        
        
      </main>
    </div>
  );
}