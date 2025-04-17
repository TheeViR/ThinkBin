import React, { useEffect, useState } from 'react'
import AddConcept from "./components/AddConcept";
import ConceptCard from './components/ConceptCard';

function App() {

  const [selectedCard, setSelectedCard] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    theory: ""
  });
  const [isMinimized, setIsMinimized] = useState(false);

  // Load concepts from localStorage when component mounts
  useEffect(() => {
    const storedConcepts = localStorage.getItem("concepts");
    if(storedConcepts){
      try {
        setConcepts(JSON.parse(storedConcepts));
      } catch (e) {
      }
    }
    setHasLoaded(true);
  }, []);


  // Save concepts to localStorage whenever it changes

  useEffect(() => {
    if(hasLoaded){
      localStorage.setItem("concepts", JSON.stringify(concepts));
    }
    
  }, [concepts, hasLoaded]);
  

  const addConcept = (newConcept)=>{ 
    setConcepts([...concepts, newConcept]);
    setVisible(!visible);
  };

  const deleteConcept = (index) => {
    const updatedConcepts = [...concepts];
    updatedConcepts.splice(index,1);
    setConcepts(updatedConcepts);
  }


  return (
    <div className='min-h-screen min-w-full p-2 bg-cyan-950'>
      <h1 className='text-cyan-600 border-b-3 border-zinc-600 pb-1  font-extrabold text-5xl text-center mb-4'>Think<span className='text-cyan-500'>Bin</span></h1>
    <button className='py-2 px-4  rounded-2xl flex fixed bottom-6 right-6 bg-cyan-700 hover:bg-cyan-500 text-white hover:text-black hover:text-shadow-md font-medium z-50 cursor-pointer'
    onClick={()=> setVisible(!visible)}
    >
      {visible ? "Hide me" : "Use me to Add"}
    </button>
    <div className='flex flex-wrap justify-center gap-6 relative'>
        {concepts.map((concept, index)=>(
          <ConceptCard 
              key={index}
              concept={concept}
              isSelected={selectedCard === index}
              onDelete={() => deleteConcept(index)}
              onClick={() => setSelectedCard (selectedCard === index ? null : index)}
          />
        ))}
      </div>

      {visible && 
      <div className='fixed  h-fit inset-y-40 inset-x-20 bg-transparent p-4 max-w-xl mx-auto z-30'>
          <AddConcept 
            onAdd={addConcept} 
            formData={formData}
            setFormData={setFormData}
            onMinimize={() => setIsMinimized(!isMinimized)}
            isMinimized={isMinimized}  
          />
      </div>
    }
    </div>
   
    

  )
}

export default App