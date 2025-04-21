
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, PackageOpen, Users } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-green-600">
            <ChefHat className="h-6 w-6" />
            <span className="font-bold text-xl">Recipe Rescue</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/donate" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <PackageOpen className="h-4 w-4" />
              <span>Donate Food</span>
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>NGO Portal</span>
            </Link>
          </nav>

          <div className="flex items-center">
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
