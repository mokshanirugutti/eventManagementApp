

const EventCard = () => {
  return (
    <div
    className=''
    >
        <div className='flex w-96 border rounded-md  p-5'>
            <div className='w-4/5 mr-2  border-r '>
                <div className='border-b pb-2'>
                    <h1 className='text-2xl font-semibold'>Title </h1>
                    <p className='text-sm font-normal text-foreground/60'>Creator</p>
                </div>
                <div    >
                    <p>Description</p>
                </div>
            </div>
            <div className='px-3 py-1'>
                <h1 className='text-lg font-semibold'>Attendens </h1>
                <ul className='text-sm font-normal text-blue-500 list-disc list-inside'>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                    <li>User 4</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default EventCard