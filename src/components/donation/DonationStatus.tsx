
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Package, User, ChefHat } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock donation data
const mockDonations = [
  {
    id: "d1",
    foodName: "Vegetable Biryani",
    quantity: "25",
    quantityUnit: "servings",
    foodType: "cooked meals",
    expiryTime: "2025-04-22T20:00:00",
    address: "123 Main St",
    city: "Mumbai",
    pincode: "400001",
    contactName: "Raj Sharma",
    contactPhone: "+91 9876543210",
    status: "pending",
    createdAt: "2025-04-21T10:30:00",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    ngo: {
      id: "1",
      name: "Food For All Foundation",
      contactPhone: "+91 8765432109",
    },
    volunteer: null,
  },
  {
    id: "d2",
    foodName: "Chocolate Chip Cookies",
    quantity: "50",
    quantityUnit: "items",
    foodType: "baked goods",
    expiryTime: "2025-04-23T18:00:00",
    address: "45 Park Avenue",
    city: "Mumbai",
    pincode: "400050",
    contactName: "Raj Sharma",
    contactPhone: "+91 9876543210",
    status: "accepted",
    createdAt: "2025-04-20T14:15:00",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    ngo: {
      id: "2",
      name: "Hunger Relief Network",
      contactPhone: "+91 7654321098",
    },
    volunteer: {
      name: "Priya Patel",
      phone: "+91 9988776655",
      estimatedArrival: "2025-04-22T16:30:00",
    },
  },
  {
    id: "d3",
    foodName: "Mixed Fruit Platter",
    quantity: "5",
    quantityUnit: "kg",
    foodType: "fruits & vegetables",
    expiryTime: "2025-04-24T12:00:00",
    address: "78 Linking Road",
    city: "Mumbai",
    pincode: "400054",
    contactName: "Raj Sharma",
    contactPhone: "+91 9876543210",
    status: "collected",
    createdAt: "2025-04-19T09:45:00",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    ngo: {
      id: "4",
      name: "Hope Meals Society",
      contactPhone: "+91 6543210987",
    },
    volunteer: {
      name: "Amit Singh",
      phone: "+91 8877665544",
      collectedAt: "2025-04-20T11:30:00",
    },
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

const getTimeRemaining = (dateString: string) => {
  const now = new Date();
  const expiryDate = new Date(dateString);
  const diffMs = expiryDate.getTime() - now.getTime();
  
  if (diffMs < 0) return 'Expired';
  
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs > 24) {
    const days = Math.floor(diffHrs / 24);
    return `${days} day${days !== 1 ? 's' : ''} left`;
  }
  
  return `${diffHrs}h ${diffMins}m left`;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="status-pending">Awaiting Pickup</Badge>;
    case 'accepted':
      return <Badge className="status-accepted">Accepted</Badge>;
    case 'collected':
      return <Badge className="status-collected">Collected</Badge>;
    case 'declined':
      return <Badge className="status-declined">Declined</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const DonationStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredDonations = activeTab === "all" 
    ? mockDonations 
    : mockDonations.filter(donation => donation.status === activeTab);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader className="bg-green-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Your Donations
          </CardTitle>
          <CardDescription>
            Track the status of your food donations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="w-full justify-start rounded-none h-12 bg-transparent p-0">
                <TabsTrigger 
                  value="all" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:shadow-none py-3 px-4"
                >
                  All Donations
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 data-[state=active]:text-amber-700 data-[state=active]:shadow-none py-3 px-4"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger 
                  value="accepted" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:shadow-none py-3 px-4"
                >
                  Accepted
                </TabsTrigger>
                <TabsTrigger 
                  value="collected" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:shadow-none py-3 px-4"
                >
                  Collected
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="m-0">
              {filteredDonations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No donations found in this category.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredDonations.map((donation) => (
                    <div key={donation.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Food image */}
                        <div className="sm:w-1/4 h-32 sm:h-auto bg-gray-100 rounded-md overflow-hidden">
                          {donation.image ? (
                            <img 
                              src={donation.image} 
                              alt={donation.foodName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <ChefHat className="h-10 w-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Donation details */}
                        <div className="sm:w-3/4 flex flex-col">
                          <div className="flex flex-col sm:flex-row justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium text-lg">{donation.foodName}</h3>
                                {getStatusBadge(donation.status)}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {donation.quantity} {donation.quantityUnit} of {donation.foodType}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-amber-500" />
                              <span className="text-sm font-medium">
                                {getTimeRemaining(donation.expiryTime)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                              <span className="text-gray-600">
                                {donation.address}, {donation.city}, {donation.pincode}
                              </span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-gray-600">
                                Expires: {formatDate(donation.expiryTime)}
                              </span>
                            </div>
                          </div>
                          
                          {/* NGO and volunteer information */}
                          {donation.status !== 'pending' && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm font-medium">
                                {donation.status === 'accepted' ? 'Accepted by:' : 'Collected by:'}
                              </p>
                              <p className="text-sm">{donation.ngo.name}</p>
                              
                              {donation.volunteer && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1 text-blue-500" />
                                    <span className="text-sm font-medium">Volunteer: {donation.volunteer.name}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <Phone className="h-4 w-4 mr-1 text-blue-500" />
                                    <span className="text-sm">{donation.volunteer.phone}</span>
                                  </div>
                                  {donation.volunteer.estimatedArrival && (
                                    <div className="flex items-center mt-1">
                                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                                      <span className="text-sm">
                                        {donation.status === 'accepted' 
                                          ? `Estimated arrival: ${formatDate(donation.volunteer.estimatedArrival)}`
                                          : `Collected: ${formatDate(donation.volunteer.collectedAt!)}`
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationStatus;
