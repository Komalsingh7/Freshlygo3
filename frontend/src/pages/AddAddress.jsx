 import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
 
 const InputField = ({type , placeholder, name , handlechange , address})=>(
    <input 
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type} 
    placeholder={placeholder}
    name={name}
    onChange={handlechange}
    value={address[name]}
    required
    
    />
 )
 const AddAddress = () => {
  const {axios , user , navigate} = useAppContext();
    const [address, setAddress] = React.useState({
        firstName: "",
        lastName: "",
        email:"",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone:"",
    })

    const handlechange = (e) => {
        const {name, value} = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async(e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post('/api/address/add', {
      address,
      userId: user._id
    });

    if (data.success) {
      toast.success(data.message);
      navigate('/cart');
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log("Error adding address:", error);
    toast.error(error.message || "Something went wrong");
  }
};

    useEffect(()=>{
       if(!user){
          navigate('/cart');
       }
    },[])

   return (
     <div className='mt-16 pb-16'>
    <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span
          className='font-semibold text-primary'
       >Address</span></p>

    <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
         <div className='flex-1 max-w-md'>
            <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                  <div className='grid grid-cols-2 gap-4'>
                      <InputField handlechange = {handlechange} address={address}
                        name='firstName' type='text' placeholder='First Name' />
                        <InputField handlechange = {handlechange} address={address}
                        name='lastName' type='text' placeholder='Last Name' />
                      
                  </div>
                  <InputField handlechange = {handlechange} address={address}
                        name='email' type='email' placeholder='Email' />
                  <InputField handlechange = {handlechange} address={address}
                        name='street' type='text' placeholder='Street Address' />
                 <div className='grid grid-cols-2 gap-4'>
                        <InputField handlechange = {handlechange} address={address}
                            name='city' type='text' placeholder='City' />
                            <InputField handlechange = {handlechange} address={address}
                            name='state' type='text' placeholder='State' />
                 </div>

                 <div className='grid grid-cols-2 gap-4'>
                        <InputField handlechange = {handlechange} address={address}
                            name='zipCode' type='number' placeholder='Zip code' />
                            <InputField handlechange = {handlechange} address={address}
                            name='country' type='text' placeholder='Country' />
                 </div>
                 <InputField handlechange = {handlechange} address={address}
                        name='phone' type='number' placeholder='Phone Number' />

                        <button type='submit' className='w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition'>
                             Save Address 
                            </button>
            </form>
         </div>
      <img className='md:mr-16 mb-16 md:mt-0' src = {assets.add_address_iamge}  alt="Add Address"/>
    </div>

     </div>
   )
 }
 
 export default AddAddress
 