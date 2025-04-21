
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationForm from "@/components/donation/DonationForm";
import NGOList from "@/components/donation/NGOList";
import DonationStatus from "@/components/donation/DonationStatus";
import { ChefHat, Package, Users } from "lucide-react";

const Donate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("donate");
  const [userPincode, setUserPincode] = useState<string>("");

  // We would get the pincode from the form submission in a real app
  const handleFormSubmitted = (pincode: string) => {
    setUserPincode(pincode);
    setActiveTab("ngo");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Donation Portal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your surplus food with those in need. Your extra food can make a difference in someone's life.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger value="donate" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                <ChefHat className="h-4 w-4 mr-2" />
                Donate Food
              </TabsTrigger>
              <TabsTrigger value="ngo" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                <Users className="h-4 w-4 mr-2" />
                Find NGOs
              </TabsTrigger>
              <TabsTrigger value="status" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
                <Package className="h-4 w-4 mr-2" />
                Your Donations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="donate" className="mt-0">
            <DonationForm />
          </TabsContent>
          
          <TabsContent value="ngo" className="mt-0">
            <NGOList pincode={userPincode} />
          </TabsContent>
          
          <TabsContent value="status" className="mt-0">
            <DonationStatus />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Donate;
