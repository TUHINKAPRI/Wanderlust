import React from 'react'

function OAuth() {
  async function clickHandler(){
try{

}catch(err){
  console.log(err)
}
  }
  return (
   <button  type='button' className='bg-red-500 p-3 rounded-lg text-white' onClick={clickHandler}>Continue With Google</button>
  )
}

export default OAuth




