import {IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";


export default function Settings () {
    return(
        <div>
            <div>
                <div>
                    <IoSettingsOutline />
                    <h1>Settings</h1>
                </div>
                <p>Customize your KaziHub experience</p>
            </div>

            <div>
                <div>
                    <div>
                        <FiUser />
                        <h1>Profile & KYC Information</h1>
                    </div>

                    <p>Manage your account and identity verification details</p>
                </div>
                
                <div>
                    <div>
                        <h1>Email</h1>
                        <input type="text" placeholder="Julius@gmail.com" />
                    </div>

                    <div>
                        <h1>Member Since</h1>
                        <input type="text" placeholder="12/09/2025" />
                    </div>

                </div>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                <div>
                    <h2>Personal Information</h2>

                    <div>
                        <div>
                            <h1>Username</h1>
                            <input type="text" placeholder="Julius" />
                        </div>

                        <div>
                            <h1>First Name</h1>
                            <input type="text" placeholder="Julius" />
                        </div>

                        <div>
                            <h1>Last Name</h1>
                            <input type="text" placeholder="mk" />
                        </div>

                    </div>

                    <div>
                        <div>
                            <h1>Phone Number</h1>
                            <input type="text" placeholder="0707759667" />
                        </div>

                        <div>
                            <h1>Date of Birth</h1>
                            <input type="text" placeholder="12/10/2000" />
                        </div>

                    </div>

                </div>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                <div>
                    <h2>Address Information</h2>

                    <div>
                        <h1>Street Address</h1>
                        <input type="text" placeholder="Enter your street address" />
                    </div>
                    <div>
                        <div>
                            <h1>City</h1>
                            <input type="text" placeholder="Enter your city" />
                        </div>

                         <div>
                            <h1>State/Province</h1>
                            <input type="text" placeholder="Enter your state/province" />
                        </div>

                         <div>
                            <h1>Postal Code</h1>
                            <input type="text" placeholder="Enter postal code" />
                        </div>

                         <div>
                            <h1>Country</h1>
                            <input type="text" placeholder="Enter your country" />
                        </div>

                        <div>
                            <div>
                                <button>Update Profile</button>
                            </div>

                            <div>
                                <button>Sign Out</button>
                            </div>
                        </div>

                    </div>

                    

                </div>
            </div>
                    
        </div>
    );
}