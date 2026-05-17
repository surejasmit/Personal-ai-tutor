// ============================================
// NAVBAR COMPONENT - Build this step by step!
// Follow the guide in the artifact to complete.
// ============================================

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-white shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-black">Personal AI Tutor</Link>
        <div className="space-x-4">
          <Link to="/" className="text-sm text-gray-600">Home</Link>
          <Link to="/login" className="text-sm text-gray-600">Login</Link>
          <Link to="/signup" className="text-sm text-blue-600 font-medium">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
