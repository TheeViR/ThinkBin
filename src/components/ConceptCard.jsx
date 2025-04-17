import React, { useState } from 'react'

function ConceptCard({concept, onDelete, isSelected, onClick}) {


  return (
    <div 
    onClick={onClick}
    className={`
        m-4 px-4 py-1 rounded-lg shadow-lg bg-zinc-950  cursor-pointer transition-all duration-300 hover:shadow-cyan-500/45
        ${isSelected ? 'z-50 scale-110 fixed top-20 left-1/2 -translate-x-1/2 w-[80%] h-[70vh]' : 'relative z-10 w-60'}
    `}
      style={{ overflow: 'hidden' }}
    >
      <h2 className='text-3xl text-cyan-700 capitalize font-semibold '>{concept.heading}</h2>

      <h3 className=' mt-1 font-semibold capitalize text-cyan-600'>{concept.subheading}</h3>

        {isSelected && (
          <div className='border-2 border-zinc-500 p-2 mt-4 overflow-y-auto h-[75%] text-cyan-400 cursor-pointer'>
            <p className='whitespace-pre-wrap'>{concept.theory}</p>
          </div>
        )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className='text-md font-semibold text-shadow-md cursor-pointer text-rose-500 hover:text-rose-800  py-1 rounded hover:underline'
      >
        Remove
      </button>
    </div>
  )
}

export default ConceptCard