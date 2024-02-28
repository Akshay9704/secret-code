import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtonUI from "../UI/components/button"
import Sparkles from "../UI/components/sparkles"
import TextField from "../UI/components/textfield"
import { TextGenerateEffectDemo } from "../UI/components/typewriter"
import Helper from "../helper";

const Main = () => {
  const [text, setText] = useState("");
  const [links, setLinks] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [buttonText, setButtonText] = useState("CREATE SECRET LINK");

  const navigate = useNavigate();

  const fetchTexts = async () => {
    const texts = await Helper.getTexts();
    setLinks(texts);
  }

  const Texts = async (data)  => await Helper.addTexts(data);
  
  const handleShow = async (e) => {
    e.preventDefault();
    if (links.length === 0) {
      setShowSubmit(true);
      setButtonText("Copy code & redirect!");
      try {
        await Texts({
          link: text
        });
      } catch (error) {
        console.log(error);
      } finally {
        fetchTexts();
      }
    } else {
      alert("Only one secret code can be generated at a time.");
      setShowSubmit(true);
      setButtonText("Redirect!");
    }
  };
  

  const handleHide = () => {
    setShowSubmit(false);
    setButtonText("CREATE SECRET LINK");
    navigate("/secret");
  }

  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <div>
      <Sparkles />
      <div className="flex justify-center -mt-20 mb-6">
      <TextGenerateEffectDemo/>
      </div>
      <div className="flex flex-col items-center mx-5 md:mx-0 lg:mx-0">
        {showSubmit === false ? (
          <div className="bg-slate-800 rounded-2xl p-8 w-full md:w-4/5 lg:w-1/2 flex flex-col gap-3 items-center">
            <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-3">Add text here...</h2>
            <TextField text={text} setText={setText} />
            <div onClick={handleShow}>
              <ButtonUI buttonText={buttonText} />
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-8 w-full md:w-1/2 lg:w-1/2">
            {links.map((link) => (
              <div key={link.id}>
                <p className="text-white text-xl uppercase">Secret Code:</p>
                <p className="text-white text-xs font-bold">(Copy the code)</p>
                <div className="bg-slate-900 p-5 rounded-2xl mt-2">
                  <p className="text-white text-sm md:text-lg lg:text-xl">{link.id}</p>
                </div>
                <div className="flex justify-end mt-3" onClick={handleHide}>
                  <ButtonUI buttonText={buttonText} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-12">
        <h1 className="text-center text-4xl text-white font-bold"><span className="text-blue-500">One - Time</span> Secrets</h1>
        <h5 className="text-center mt-3 text-lg text-white font-bold">Share sensitive information that can only be viewed one time.</h5>
      </div>
    </div>
  )
}

export default Main