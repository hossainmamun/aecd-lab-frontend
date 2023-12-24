const DashboardHome = () => {
   const dateTime = new Date().toLocaleString();

   return (
      <div className='flex justify-center items-center h-screen w-full'>
         <div className='space-y-6 text-center'>
            <h2 className='text-lg sm:text-xl md:text-3xl lg:text-5xl uppercase font-extrabold'>
               welcome to deshboard
            </h2>
            <p className='text-base md:text-lg capitalize'>
               power is your, now you can create, update, read, delete
            </p>
            <p className='font-extrabold text-primary'>{dateTime}</p>
         </div>
      </div>
   );
};

export default DashboardHome;
