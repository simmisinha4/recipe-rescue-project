
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for NGOs
const mockNGOs = [
  {
    id: "1",
    name: "Food For All Foundation",
    address: "123 Main Street, Downtown",
    city: "Mumbai",
    pincode: "400001",
    distance: 2.3,
    phone: "+91 9876543210",
    availabilityHours: "9:00 AM - 6:00 PM",
    description: "We distribute food to homeless shelters across the city.",
    isFoodBankActive: true,
  },
  {
    id: "2",
    name: "Hunger Relief Network",
    address: "45 Park Avenue, Bandra West",
    city: "Mumbai",
    pincode: "400050",
    distance: 3.7,
    phone: "+91 9876543211",
    availabilityHours: "10:00 AM - 8:00 PM",
    description: "Serving nutritious meals to underserved communities since 2010.",
    isFoodBankActive: true,
  },
  {
    id: "3",
    name: "Community Food Share",
    address: "78 Linking Road, Santacruz",
    city: "Mumbai",
    pincode: "400054",
    distance: 5.1,
    phone: "+91 9876543212",
    availabilityHours: "8:00 AM - 5:00 PM",
    description: "We collect and distribute excess food from events and restaurants.",
    isFoodBankActive: false,
  },
  {
    id: "4",
    name: "Hope Meals Society",
    address: "221 Marine Drive",
    city: "Mumbai",
    pincode: "400020",
    distance: 6.2,
    phone: "+91 9876543213",
    availabilityHours: "24/7 Availability",
    description: "Emergency food relief for disaster-affected areas and communities in need.",
    isFoodBankActive: true,
  },
];

interface NGOListProps {
  pincode?: string;
}

const NGOList: React.FC<NGOListProps> = ({ pincode = "" }) => {
  const { toast } = useToast();
  const [selectedNGOs, setSelectedNGOs] = useState<string[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  
  // Filter NGOs by pincode if provided (in real app would fetch from backend)
  const filteredNGOs = pincode 
    ? mockNGOs.filter(ngo => ngo.pincode.startsWith(pincode.substring(0, 3)))
    : mockNGOs;
    
  const handleToggleSelect = (ngoId: string) => {
    setSelectedNGOs(prev => 
      prev.includes(ngoId) 
        ? prev.filter(id => id !== ngoId) 
        : [...prev, ngoId]
    );
  };
  
  const handleSendRequest = async () => {
    if (selectedNGOs.length === 0) {
      toast({
        title: "No NGOs selected",
        description: "Please select at least one NGO to send your request.",
        variant: "destructive",
      });
      return;
    }
    
    setIsRequesting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request sent successfully!",
        description: `Your donation request has been sent to ${selectedNGOs.length} NGO${selectedNGOs.length > 1 ? 's' : ''}.`,
        variant: "default",
      });
      
      setSelectedNGOs([]);
    } catch (error) {
      toast({
        title: "Error sending request",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader className="bg-green-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Nearby Food Banks & NGOs
          </CardTitle>
          <CardDescription>
            Select organizations to notify about your donation
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredNGOs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No NGOs found in your area.</p>
              <p className="text-sm text-gray-400 mt-2">Try changing your pincode or contact us for assistance.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNGOs.map((ngo) => (
                <div 
                  key={ngo.id}
                  className={`p-4 border rounded-lg transition-all ${
                    selectedNGOs.includes(ngo.id) 
                      ? 'border-green-500 bg-green-50' 
                      : 'hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{ngo.name}</h3>
                        {ngo.isFoodBankActive ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-500 border-amber-200">Limited Availability</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1">{ngo.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="flex items-center text-xs text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {ngo.distance} km away
                        </span>
                        <span className="flex items-center text-xs text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {ngo.availabilityHours}
                        </span>
                        <span className="flex items-center text-xs text-gray-600">
                          <Phone className="h-3 w-3 mr-1" />
                          {ngo.phone}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      variant={selectedNGOs.includes(ngo.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleSelect(ngo.id)}
                      className={selectedNGOs.includes(ngo.id) ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {selectedNGOs.includes(ngo.id) ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-4 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            {selectedNGOs.length} NGO{selectedNGOs.length !== 1 ? 's' : ''} selected
          </div>
          <Button
            onClick={handleSendRequest}
            disabled={selectedNGOs.length === 0 || isRequesting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isRequesting ? "Sending Request..." : "Send Pickup Request"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NGOList;
