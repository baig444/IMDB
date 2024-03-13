import { InfinitySpin } from 'react-loader-spinner'

function Loading() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <InfinitySpin
  visible={true}
  width="200"
  color="#6556CD"
  ariaLabel="infinity-spin-loading"
  />

    </div>
  )
}

export default Loading
