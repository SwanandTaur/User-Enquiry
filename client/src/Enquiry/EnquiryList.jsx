
import axios, { Axios } from "axios"
import React from "react"
import { toast } from "react-toastify"

export default function EnquiryList({ data, getData, swal, setFormData }) {

    let deleteData = (delid, name) => {
        swal.fire({
            title:`Do you want to delete ${name}'s info?`,
            showDenyButton:true,
            showCancleButton:true,
            confirmButtonText:"Delete",

        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/web/enquiry/delete/${delid}`)
                    .then((res) => {
                        toast.success(`${name}'s info deleted successfully`)
                        getData()
                    })
            } else if (result.isDenied) {
                swal.fire("Info not deleted!", "", "info")
            }
        })
    }

    let editData = (edid) => {
        axios.get(`http://localhost:8000/api/web/enquiry/singleUser/${edid}`)
        .then((res)=>{
            let data = res.data
            setFormData(data.enquiry)
        })
    }
    return (

        <div className="text-white p-6 m-6 rounded">
            <h2 className="font-bold text-[20px]">We are in Touch with</h2>
            <div className="overflow-x-auto py-6">
                <table className="w-full table-auto border-separate border-spacing-y-2 border-spacing-x-2" >
                    <thead className="block">
                        <tr className="w-full flex space-x-2">
                            <th className='w-[8%] bg-green-500 text-white px-2 rounded-md py-2'>Sr No</th>
                            <th className='w-[15%] bg-green-500 text-white px-2 rounded-md py-2'>Name</th>
                            <th className='w-[20%] bg-green-500 text-white px-2 rounded-md py-2'>Email</th>
                            <th className='w-[15%] bg-green-500 text-white px-2 rounded-md py-2'>Phone</th>
                            <th className='w-[25%] bg-green-500 text-white px-2 rounded-md py-2'>Message</th>
                            <th className='w-[8%] bg-green-500 text-white px-2 rounded-md py-2'>Delete</th>
                            <th className='w-[8%] bg-green-500 text-white px-2 rounded-md py-2'>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="block max-h-[370px] overflow-y-scroll hide-scrollbar">
                        {
                            data.length >= 1 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={item._id} className='text-center '>
                                            <td className='w-[8%] bg-white text-black rounded-md px-2 py-2'>{index + 1}</td>
                                            <td className='w-[15%] bg-white text-black rounded-md px-2 py-2'>{item.name}</td>
                                            <td className='w-[20%] bg-white text-black rounded-md px-2 py-2'>{item.email}</td>
                                            <td className='w-[15%] bg-white text-black rounded-md px-2 py-2'>{item.phone}</td>
                                            <td className='w-[25%] bg-white text-black rounded-md px-2 py-2 '>{item.message}</td>
                                            <td className="w-[8%] px-2 py-2">
                                                <button onClick={() => deleteData(item._id, item.name)} className='bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer'>Delete</button>
                                            </td>
                                            <td className="w-[8%] px-2 py-2">
                                                <button onClick={() => editData(item._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className='w-full center text-center'>
                                    <td className='py-3 text-red-600 w-full ' colSpan="7">No Data Available</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
