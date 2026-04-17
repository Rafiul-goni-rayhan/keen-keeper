import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh] flex flex-col justify-center items-center text-center">
      
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 max-w-lg w-full flex flex-col items-center">
        <FiAlertCircle className="text-6xl text-primary mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        <p className="text-gray-500 mb-8 px-4">
          try again
        </p>
        
        <Link 
          href="/" 
          className="btn bg-primary text-white hover:bg-[#15352c] border-none rounded-md px-8 w-full sm:w-auto"
        >
          Go Back Home
        </Link>
      </div>

    </div>
  );
}