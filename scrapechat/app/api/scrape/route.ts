
import { NextRequest, NextResponse } from "next/server";    
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";


    

//to manage timeout
async function fetchWithTimeout(url: string, ms: number = 600000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    clearTimeout(timeoutId);
    return response;
  }catch (error) {
    clearTimeout(timeoutId);  
    throw error;      
    
} 
} 


export async function GET(request: NextRequest){
    const{searchParams} = new URL(request.url);
    
    

    const targetUrl = searchParams.get('url');

    if(!targetUrl){

        return NextResponse.json({error:'URL parameter is required'},{status:400});
    }

    try{
        console.log('Fetching:', targetUrl);
        
        const fetchResponse = await fetchWithTimeout(targetUrl, 60000); 
        

        if (!fetchResponse.ok){
            throw new Error(`HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`)
        }
        const html = await fetchResponse.text();

        //parsing html
        

        const $ = cheerio.load(html);
        //Extract data using CSS selectors
        const title = $('title').first().text().trim() || 
                    $('h1').first().text().trim() || 
                    'No title found';
        
        const description = $('meta[name="description"]').attr('content')?.trim() || '';
        
        const links = $('a[href]').map((i, el): string => {
            return $(el).attr('href') || '';
        }).get();  

        const fullHTML =$.html();//returns everything unstructured
        console.log(fullHTML);

        
        
        //Return success JSON response
        return NextResponse.json({
            success: true,
            title,
            description,
            links,
            fullHTML,

            timestamp: new Date().toISOString()
        });

        

        
    }catch (error) {
    // Error handling 
    console.error('Scrape error:', error);

    // Handle timeout specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Request to target URL timed out (10 seconds)' 
        },
        { status: 504 } // Gateway Timeout
      );
    }

    // All other errors
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}



