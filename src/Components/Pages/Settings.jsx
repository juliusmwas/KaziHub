import {IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";


export default function Settings () {
    return(
        <div>
            <div>
                <div className="flex gap-3 items-center">
                    <IoSettingsOutline className="text-xl font-bold  lg:text-3xl" />
                    <h1 className="text-xl font-bold   lg:text-3xl">Settings</h1>
                </div>
                <p className="text-xs font-normal p-1 text-gray-500">Customize your KaziHub experience</p>
            </div>

            <div className="bg-white rounded-xl mt-4 shadow-sm">
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        <FiUser className="text-xl font-medium   lg:text-2xl" />
                        <h1 className="text-xm font-medium   lg:text-2xl">Profile & KYC Information</h1>
                    </div>

                    <p className="text-xs font-normal p-1 text-gray-500">Manage your account and identity verification details</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                    <div>
                        <h1 className="text-sm font-medium p-1 ">Email</h1>
                        <input type="text" placeholder="Julius@gmail.com" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm cursor-not-allowed font-normal rounded-lg" />
                    </div>

                    <div>
                        <h1 className="text-sm font-medium p-1 ">Member Since</h1>
                        <input type="text" placeholder="12/09/2025" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm cursor-not-allowed font-normal rounded-lg" />
                    </div>

                </div>
                <div className="p-4">
                    <hr class="h-px mt-4 bg-gray-50"></hr>
                </div>

                <div className="p-4">
                    <h2 className="text-lg font-medium p-1">Personal Information</h2>

                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                        <div>
                            <h1 className="text-sm font-medium p-1">Username</h1>
                            <input type="text" placeholder="Julius" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                        </div>

                        <div>
                            <h1 className="text-sm font-medium p-1">First Name</h1>
                            <input type="text" placeholder="Julius" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                        </div>

                        <div>
                            <h1 className="text-sm font-medium p-1">Last Name</h1>
                            <input type="text" placeholder="mk" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg"/>
                        </div>

                    </div>

                    <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <div>
                            <h1 className="text-sm font-medium p-1">Phone Number</h1>
                            <input type="text" placeholder="0707759667" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                        </div>

                        <div>
                            <h1 className="text-sm font-medium p-1">Date of Birth</h1>
                            <input type="text" placeholder="12/10/2000" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                        </div>

                    </div>

                </div>
                <div className="p-4">
                    <hr class="h-px mt-4 bg-gray-50"></hr>
                </div>

                <div className="p-4">
                    <h2 className="text-lg font-medium p-1">Address Information</h2>

                    <div>
                        <h1 className="text-sm font-medium p-1">Street Address</h1>
                        <input type="text" placeholder="Enter your street address" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div>
                            <h1 className="text-sm font-medium p-1">City</h1>
                            <input type="text" placeholder="Enter your city" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg"/>
                        </div>

                         <div>
                            <h1 className="text-sm font-medium p-1">State/Province</h1>
                            <input type="text" placeholder="Enter your state/province" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                        </div>

                         <div>
                            <h1 className="text-sm font-medium p-1">Postal Code</h1>
                            <input type="text" placeholder="Enter postal code" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg" />
                        </div>

                         <div>
                            <h1 className="text-sm font-medium p-1">Country</h1>
                            <input type="text" placeholder="Enter your country" className="bg-gray-200 p-2  w-full placeholder-gray-500 text-gray-700 text-sm  font-normal rounded-lg"/>
                        </div>

                    </div>

                    <div className="flex items-center mt-4  justify-between">
                            <div>
                                <button className="bg-blue-600 mt-2 text-white flex gap-4  items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500">Update Profile</button>
                            </div>

                            <div>
                                <button className="bg-red-600 mt-2 text-white flex gap-4  items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-red-500">Sign Out</button>
                            </div>
                        </div>                    

                </div>
            </div>
                    
        </div>
    );
}