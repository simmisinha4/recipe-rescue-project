
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Clock, Heart, Package, PhoneCall, Users } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Share Your Extra Food, <span className="text-green-600">Make a Difference</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Connect with local NGOs to donate your surplus food. Help reduce food waste and feed those in need after your events and gatherings.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link to="/donate">Donate Food</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/admin">NGO Portal</Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
                  alt="Food donation" 
                  className="rounded-lg shadow-xl w-full object-cover h-[300px] md:h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform connects food donors with local NGOs and food banks in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-green-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <ChefHat className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">1. Register Your Donation</h3>
                    <p className="text-gray-600">
                      Fill out our simple form with details about your surplus food, quantity, and pickup information.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">2. Connect with NGOs</h3>
                    <p className="text-gray-600">
                      Browse and select from a list of nearby NGOs and food banks that can collect your donation.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <Package className="h-7 w-7 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">3. Food Pickup</h3>
                    <p className="text-gray-600">
                      The selected NGO will confirm and arrange for a volunteer to collect your food donation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Benefits section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                  alt="Community food sharing" 
                  className="rounded-lg shadow-lg w-full h-[350px] object-cover"
                />
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Donate Your Surplus Food?</h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Combat Hunger</h3>
                      <p className="mt-1 text-gray-600">
                        Help feed those in need in your community with food that would otherwise go to waste.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Reduce Food Waste</h3>
                      <p className="mt-1 text-gray-600">
                        Prevent perfectly good food from ending up in landfills and contribute to sustainability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <PhoneCall className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Simple & Convenient</h3>
                      <p className="mt-1 text-gray-600">
                        Our platform makes it easy to connect with local organizations that can collect your donation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link to="/donate">Start Donating</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-6 w-6 text-green-400" />
                <span className="font-bold text-xl">Recipe Rescue</span>
              </div>
              <p className="text-gray-300">
                Connecting food donors with those in need, reducing waste and fighting hunger together.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/donate" className="text-gray-300 hover:text-white">Donate Food</Link>
                </li>
                <li>
                  <Link to="/admin" className="text-gray-300 hover:text-white">NGO Portal</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">
                Have questions about food donation?
              </p>
              <p className="text-gray-300">
                Email: <a href="mailto:help@reciperescue.org" className="text-green-400 hover:underline">help@reciperescue.org</a>
              </p>
              <p className="text-gray-300">
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Recipe Rescue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

