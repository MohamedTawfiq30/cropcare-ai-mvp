"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
  
    if (!auth) {
      alert("Firebase is not initialized. Please check your environment variables.");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };
  
 
            
    
 return (

       <div className="min-h-screen   bg-radial from-green-50 via-green-80 to-green-100">
           
      
           <div className="text-center pt-30">
                      <h1 className="text-4xl text-green-800 font-bold">
                                  🌱CropCare AI
                  </h1>
                      <p className="mt-2 ml-10 text-sm text-gray-500">
                           Smart Agriculture Dashboard
                     </p>
          </div>
          {/* Card */}
          <div className="flex justify-center mt-10">
            
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                   <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">
                                 Login
                   </h2>
                
                <form onSubmit={handleLogin}>
                 <input  type="email" name="email"  placeholder="Enter The Email" className=" text-gray-700 placeholder:text-gray-400 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-5 " required />
                 <input  type="password" name="password"  placeholder="Enter The Password" className=" text-gray-700 placeholder:text-gray-400 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-8 " required />
                 
                 <button  className="w-full py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition">Login </button>
                </form>

                <p className=" text-center mt-5  text-sm text-gray-500">
                          Monitoring your crops made simple.
                     </p>
          </div>
        </div>



      </div>
    );
}
