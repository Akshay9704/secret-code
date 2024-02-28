import React, { useState, useEffect } from 'react';
import ButtonUI from '../UI/components/button';
import Helper from "../helper";

const Secret = () => {
  const [enterInput, setEnterInput] = useState("Enter Code Here...");
  const [codeInput, setCodeInput] = useState("");
  const [links, setLinks] = useState([]);

  const fetchTexts = async () => {
    const texts = await Helper.getTexts();
    setLinks(texts);
  }

  const handleTextChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleSubmit = async () => {
    const foundText = links.find(text => text.id === codeInput);
    if (foundText) {
      setCodeInput(foundText.link);
      await Helper.deleteTexts(foundText.id);
      setEnterInput("Your secret message is...");
    }
  };  

  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center mt-20 mx-5 md:mx-0 lg:mx-0">
        <div className="bg-slate-800 rounded-2xl p-8 w-full md:w-4/5 lg:w-1/2 flex flex-col gap-3 items-center">
          <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-3">{enterInput}</h2>
          <input className='font-semibold text-lg text-white bg-slate-600 rounded-xl p-4 outline-none' cols="10" rows="5" id="text" placeholder="Enter your secret text" value={codeInput} onChange={handleTextChange} />
          <div onClick={handleSubmit}>
          <ButtonUI buttonText="Reveal the secret!"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secret;
