/* eslint-disable react/prop-types */

function Dropdown({title,options,func}) {
  return (
    <div> 
      <select onChange={func} defaultValue="0" name="format" id="format" className="bg-[#6556CD] text-white p-1 w-[15vw] rounded-sm outline-none border-none">
        <option value="0" disabled className="text-white">
            {title}
        </option>
        {
          options.map((item,i)=>(
            <option key={i} value={item} className="text-white">{item}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Dropdown
