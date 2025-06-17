import Button from "@/Componant/Button"
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactUs({sendMessage}:{sendMessage:any}) {

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")

    const contactUsArgs={
        userName:name,
        userEmail:email,
        title:title,
        content:content,
    }

    return (
        <motion.div key="Main" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-10"> 
            <div>
                <span className="text-blue-400 inline-block w-[100%] text-center my-10 font-bold text-[30px]">Contact Us</span>
                <span className="text-gray-500 inline-block w-[100%] text-center mb-5 text-[15px]">If you have any questions or suggestions, please feel free to contact us at any time.</span>
            </div>
            <div className="flex justify-between w-[100%] my-10 ">
                <div className='mx-auto w-[45%] shadow-gray-400 shadow-lg rounded-4xl bg-gray-100'>
                    <span className="text-blue-400 inline-block w-[100%] ml-6 my-5 font-bold text-[24px]">Contact Information</span>
                    <ul>
                        <li className="ml-6 flex gap-3">
                            <div className="bg-blue-300 rounded-full w-8 h-8 flex justify-center items-center">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <span className="font-bold text-[17px]">Address</span>
                                <p className="text-[15px]"> 1 University Road,Tainan City, 70101</p>
                            </div>
                        </li>
                        <li className="ml-6 flex gap-3">
                            <div className="bg-blue-300 rounded-full w-8 h-8 flex justify-center items-center">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div >
                                <span className="font-bold text-[17px]">E-mail</span>
                                <p>m16131072@gs.ncku.edu.com</p>
                            </div>
                        </li>
                        <li className="ml-6 flex gap-3">
                            <div className="bg-blue-300 rounded-full w-8 h-8 flex justify-center items-center">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div>
                                <span className="font-bold text-[17px]">Tel</span>
                                <p>(06) 1234567</p>
                            </div>
                        </li>
                        <li className="ml-6 flex gap-3">
                            <div className="bg-blue-300 rounded-full w-8 h-8 flex justify-center items-center">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div >
                                <span className="font-bold text-[17px]">Service Hours </span>
                                <p style={{ "margin": 0 }}>Monday to Friday: 9:00 AM – 6:00 PM</p>
                                <p>Saturday to Sunday: Closed</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='mx-auto w-[45%] shadow-gray-400 shadow-lg rounded-4xl bg-gray-100'>
                    <span className="text-blue-400 inline-block w-[100%] ml-6 my-5 font-bold text-[24px]">Send Message</span>
                    <div className="mb-5 ml-6">
                        <label>
                            <span className="w-full inline-block font-bold">Name</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="flex justify-center border-1 border-gray-400 selection:border-black rounded-2xl w-[90%] " required />
                        </label>
                    </div>
                    <div className="mb-5 ml-6">
                        <label><span className="w-full inline-block font-bold">E-mail</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="flex justify-center border-1 border-gray-400 selection:border-black rounded-2xl w-[90%] " required />
                        </label>
                    </div>
                    <div className="mb-5 ml-6">
                        <label><span className="w-full inline-block font-bold">Title</span>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="flex justify-center border-1 border-gray-400 selection:border-black rounded-2xl w-[90%] " required />
                        </label>
                    </div>
                    <div className="mb-5 ml-6">
                        <label>
                            <span className="w-full inline-block font-bold">Content</span>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="overflow-y-scroll scrollbar w-[90%] h-[100px] border-2 border-gray-400 selection:border-black rounded-2xl p-3 " required></textarea>
                        </label>
                    </div>
                    <div className="mb-5 ml-6">
                        <Button type="action" name="Send Message" disabled={name==""||email==""||title==""||content==""} actionFunction={()=>sendMessage("ContactUs",contactUsArgs)} className={`${name!==""&&email!==""&&title!==""&&content!=="" ? "":"disabled:opacity-50 disabled:cursor-not-allowed"} m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-32 hover:bg-blue-600 hover:scale-110`}></Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}