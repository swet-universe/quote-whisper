import React, { useEffect, useState } from 'react';
import { QuoteGeneratorCard } from './QuoteGeneratorCard';

const QuoteApp = () => {
  const [data, setData] = useState([] as any);

  const getQuotesData = async (tag?: string) => {

    try {
      // TODO : set default catg
      // const response = await fetch('https://api.quotable.io/random')
      const response = await fetch(`https://api.quotable.io/quotes?tags=${tag}`);
      if (!response.ok) {
        throw new Error('Error in getting response!');
      }

      const responseJson = await response.json();
      console.log("getQuotesData: ", responseJson);
      setData(responseJson?.results);

    } catch (error) {
      console.error("Error while getting data: ", error);
    }

  };

  useEffect(() => {
    getQuotesData();
  }, []);

  return (
    <>
      <div className="App container mx-auto">
        {/* <header className="App-header">
      </header> */}
        <div className='text-blue-700 text-4xl font-semibold'>
          Quotes Generator
        </div>

        <p  className='py-2'>
          Keep Calm! Quotes on your way...
        </p>

        <div className='py-4'>
          <QuoteGeneratorCard data={data} getQuotesData={getQuotesData} />
        </div>
      </div>
    </>

  );
}

export default QuoteApp;