import * as React from 'react';

export default function TextField({text, setText}) {

  const handleText = (e) => {
    setText(e.target.value);
  }

  return (
    <form>
      <textarea className='font-semibold text-lg text-white bg-slate-600 rounded-xl p-4 w-full outline-none' cols="40" rows="2" id="text" onChange={handleText} value={text} placeholder='Type...'></textarea>
    </form>
  );
}
