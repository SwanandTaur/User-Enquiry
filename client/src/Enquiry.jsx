
import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import EnquiryList from './Enquiry/EnquiryList'
import { useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function Enquiry() {
    let [viewData, setViewData] = useState([])

    let [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        _id: ''
    })


    let saveEnquiry = (e) => {
        e.preventDefault();

        if (formData._id) {
            axios.put(`https://get-in-touch-1bwy.onrender.com/api/web/enquiry/update/${formData._id}`, formData)
                .then((res) => {
                    console.log(res.data);
                    toast.success(`${formData.name}'s info updated successfully...`);

                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                        _id: ''
                    })
                    viewAllEnquiries()
                })
        } else {
            axios.post("https://get-in-touch-1bwy.onrender.com/api/web/enquiry/insert", formData)
                .then((res) => {
                    console.log(res.data);
                    toast.success(`Hey ${formData.name} we are in touch now..`);

                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    })
                    viewAllEnquiries()
                })
        }
    }

    let viewAllEnquiries = () => {
        axios.get("https://get-in-touch-1bwy.onrender.com/api/web/enquiry/view")
            .then((res) => {
                return res.data
            }).then((finalData) => {
                if (finalData.status) {
                    setViewData(finalData.enquiryList)
                }
            })
    }

    let getData = (e) => {
        let inputName = e.target.name;
        let inputval = e.target.value;
        let oldData = { ...formData };

        oldData[inputName] = inputval;
        setFormData(oldData);
    }

    useEffect(() => {
        viewAllEnquiries()
    }, [])
    return (
        <div>
            <div>
                <ToastContainer />
                <h1 className='text-[25px]  text-center p4 mx-6 font-bold '><span className='bg-blue-500 text-white px-4 rounded-md'>Get in Touch</span></h1>
                <div className="grid grid-cols-[30%_auto] gap-2">
                    <div className="text-white p-6 m-6 rounded">
                        <h2 className="text-[20px] font-bold">Please Fill Your Information</h2>
                        <form action="" onSubmit={saveEnquiry}>
                            <div className="py-3">
                                <label htmlFor="name" className='text-[20px]'>Name</label>
                                <input type="text" value={formData.name} onChange={getData} name='name' required className="text-black w-full p-2 border-2 bg-amber-50 border-none outline-none rounded-lg focus:outline-none" placeholder='Enter your name' />
                            </div>
                            <div className="py-3">
                                <label htmlFor="email" className='text-[20px]'>Email</label>
                                <input type="email" value={formData.email} onChange={getData} name='email' required className="text-black w-full p-2 border-2 bg-amber-50 border-none outline-none rounded-lg focus:outline-none" placeholder='Enter your email' />
                            </div>
                            <div className="py-3">
                                <label htmlFor="phone" className='text-[20px]'>Phone</label>
                                <input type="tel" value={formData.phone} onChange={getData} name='phone' pattern="^[0-9]{10}$" title='Enter exatly 10 digits' required className="text-black w-full p-2 border-2 bg-amber-50 border-none outline-none rounded-lg focus:outline-none" placeholder='Enter your phone' />
                            </div>
                            <div className="py-3">
                                <label htmlFor="message" className='text-[20px]'>Message</label>
                                <textarea type="text" value={formData.message} onChange={getData} name='message' required className="text-black w-full p-2 border-2 bg-amber-50 border-none outline-none rounded-lg rows=(4) focus:outline-none" placeholder='Enter your openion' />
                            </div>
                            <div className="py-3 ">
                                <button className='w-[100%] bg-blue-500 py-1 rounded-lg cursor-pointer'>
                                    {formData._id ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <EnquiryList data={viewData} getData={viewAllEnquiries} swal={Swal} setFormData={setFormData} />
                </div>
            </div>
        </div>
    )
}
