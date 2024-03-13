import notfound from '../assets/teri.gif'
function Notfound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#0C0C0D]">
      <img className="h-full object-cover" src={notfound} alt="" />
    </div>
  )
}

export default Notfound
