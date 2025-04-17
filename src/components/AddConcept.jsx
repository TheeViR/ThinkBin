import React, { useState } from 'react';

function AddConcept({onAdd, formData, setFormData, onMinimize, isMinimized}) {

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const {heading, subheading, theory} = formData;
    if(!formData.heading || !formData.subheading || !formData.theory){
      setError("Submission Failed. Try again.");
      return;
    }
    setError("");

    if(heading && subheading && theory){
      onAdd({heading, subheading, theory});
      setFormData({heading:"", subheading:"", theory:""});
    }
  };
  

  return (
    <div className='fixed z-40 bottom-20 right-6 rounded-xl shadow-lg w-[400px]'>

      <div className='backdrop-blur-3xl text-cyan-400 px-4 py-2 rounded-t-xl flex justify-between items-center'>
      <span className='font-bold text-2xl mx-auto'>
      {isMinimized ? "Expand to Add" : "Write it Down"}
      </span>
      <button
      className=' rounded text-4xl text-gray-500 cursor-pointer hover:text-red-700'
      onClick={(e) => {
      e.stopPropagation();
      onMinimize();
      }}
      >
      {isMinimized ? "+" : "-"}
      </button>
      </div>


      <div className="p-4 text-gray-100 backdrop-blur-xl rounded-b-xl">
        {!isMinimized && (
        <form onSubmit={handleSubmit} className='space-y-4'>
        <input
        type="text"
        placeholder='Heading'
        className='w-full p-2 border rounded'
        value={formData.heading}
        onChange={(e)=> setFormData({...formData, heading: e.target.value})}
        />
        <input
        type="text"
        placeholder='Subheading'
        className='w-full p-2 border rounded'
        value={formData.subheading}
        onChange={(e) => setFormData({...formData, subheading: e.target.value})}
        />
        <textarea
        placeholder='Full Theory'
        className='w-full p-2 border rounded'
        rows='4'
        value={formData.theory}
        onChange={(e)=>setFormData({...formData, theory: e.target.value})}
        />
        <button
        type='submit'
        className='cursor-pointer bg-cyan-800 hover:bg-cyan-500 hover:text-zinc-900 hover:text-shadow-md text-white px-4 py-2 rounded-2xl'
        >
          Add to Bin
        </button>
        </form>
        )}
      </div>
      
      { error && (
        <div className=' text-red-500 font-extrabold p-2 rounded-2xl mb-2 text-center '>
          {error}
        </div>
        )
      }
      
    </div>

  )
}

export default AddConcept