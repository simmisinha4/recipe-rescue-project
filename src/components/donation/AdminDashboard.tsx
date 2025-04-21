
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Phone, Package, User, ChefHat, Check, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock donation requests data
const mockRequests = [
  {
    id: "req1",
    status: "pending",
    createdAt: "2025-04-21T10:30:00",
    donation: {
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
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    },
    donor: {
      name: "Raj Sharma",
      phone: "+91 9876543210",
    }
  },
  {
    id: "req2",
    status: "accepted",
    createdAt: "2025-04-20T14:15:00",
    acceptedAt: "2025-04-20T15:30:00",
    donation: {
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
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    },
    donor: {
      name: "Raj Sharma",
      phone: "+91 9876543210",
    },
    volunteer: {
      name: "Priya Patel",
      phone: "+91 9988776655",
      estimatedArrival: "2025-04-22T16:30:00",
    }
  },
  {
    id: "req3",
    status: "collected",
    createdAt: "2025-04-19T09:45:00",
    acceptedAt: "2025-04-19T10:30:00",
    collectedAt: "2025-04-20T11:30:00",
    donation: {
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
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    },
    donor: {
      name: "Raj Sharma",
      phone: "+91 9876543210",
    },
    volunteer: {
      name: "Amit Singh",
      phone: "+91 8877665544",
      collectedAt: "2025-04-20T11:30:00",
    }
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
      return <Badge className="status-pending">Pending Approval</Badge>;
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

interface VolunteerFormData {
  name: string;
  phone: string;
  estimatedArrival: string;
}

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVolunteerDialogOpen, setIsVolunteerDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [volunteerData, setVolunteerData] = useState<VolunteerFormData>({
    name: "",
    phone: "",
    estimatedArrival: "",
  });
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  
  const filteredRequests = mockRequests
    .filter(req => activeTab === "all" || req.status === activeTab)
    .filter(req => 
      searchTerm === "" || 
      req.donation.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.donation.pincode.includes(searchTerm) ||
      req.donor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleVolunteerFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVolunteerData(prev => ({ ...prev, [name]: value }));
  };

  const handleAcceptRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsVolunteerDialogOpen(true);
  };

  const handleSubmitVolunteerData = async () => {
    if (!volunteerData.name || !volunteerData.phone || !volunteerData.estimatedArrival) {
      toast({
        title: "Incomplete information",
        description: "Please fill all volunteer details",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessingAction(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Donation accepted",
        description: "Volunteer has been assigned successfully",
        variant: "default",
      });
      
      setIsVolunteerDialogOpen(false);
      setVolunteerData({
        name: "",
        phone: "",
        estimatedArrival: "",
      });
      
      // We would update the state here in a real app
      
    } catch (error) {
      toast({
        title: "Error accepting donation",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleMarkAsCollected = async (requestId: string) => {
    setIsProcessingAction(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Status updated",
        description: "Donation has been marked as collected",
        variant: "default",
      });
      
      // We would update the state here in a real app
      
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    setIsProcessingAction(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Donation declined",
        description: "The donor has been notified",
        variant: "default",
      });
      
      // We would update the state here in a real app
      
    } catch (error) {
      toast({
        title: "Error declining donation",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsProcessingAction(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            NGO Donation Management Dashboard
          </CardTitle>
          <CardDescription>
            Manage and track food donation requests
          </CardDescription>
        </CardHeader>
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 items-center bg-gray-50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by food, pincode or donor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-sm text-gray-500 mr-2">Showing: </span>
            <select 
              className="text-sm border rounded-md px-2 py-1"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="collected">Collected</option>
            </select>
          </div>
        </div>

        <CardContent className="p-0">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No donation requests found.</p>
              <p className="text-sm text-gray-400 mt-2">
                {searchTerm ? "Try changing your search term" : "New donations will appear here"}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Food image */}
                    <div className="sm:w-1/5 h-32 sm:h-auto bg-gray-100 rounded-md overflow-hidden">
                      {request.donation.image ? (
                        <img 
                          src={request.donation.image} 
                          alt={request.donation.foodName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ChefHat className="h-10 w-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Request details */}
                    <div className="sm:w-4/5 flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium text-lg">{request.donation.foodName}</h3>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {request.donation.quantity} {request.donation.quantityUnit} of {request.donation.foodType}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-sm font-medium">
                            {getTimeRemaining(request.donation.expiryTime)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                          <span className="text-gray-600">
                            {request.donation.address}, {request.donation.city}, {request.donation.pincode}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-gray-600">
                            Donor: {request.donor.name} ({request.donor.phone})
                          </span>
                        </div>
                      </div>
                      
                      {/* Status specific information */}
                      {request.status === 'accepted' && request.volunteer && (
                        <div className="mt-4 pt-3 border-t">
                          <p className="text-sm font-medium">Assigned Volunteer</p>
                          <div className="mt-1 p-2 bg-blue-50 rounded-md flex flex-col sm:flex-row gap-4">
                            <div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1 text-blue-500" />
                                <span className="text-sm">{request.volunteer.name}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Phone className="h-4 w-4 mr-1 text-blue-500" />
                                <span className="text-sm">{request.volunteer.phone}</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-1 sm:mt-0">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm">
                                {`Est. pickup: ${formatDate(request.volunteer.estimatedArrival)}`}
                              </span>
                            </div>
                            <div className="ml-auto">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                                onClick={() => handleMarkAsCollected(request.id)}
                                disabled={isProcessingAction}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark as Collected
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {request.status === 'collected' && request.volunteer && (
                        <div className="mt-4 pt-3 border-t">
                          <p className="text-sm font-medium">Collection Details</p>
                          <div className="mt-1 p-2 bg-green-50 rounded-md flex flex-col sm:flex-row gap-4">
                            <div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1 text-green-600" />
                                <span className="text-sm">{request.volunteer.name}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Phone className="h-4 w-4 mr-1 text-green-600" />
                                <span className="text-sm">{request.volunteer.phone}</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-1 sm:mt-0">
                              <Clock className="h-4 w-4 mr-1 text-green-600" />
                              <span className="text-sm">
                                {`Collected: ${formatDate(request.volunteer.collectedAt)}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Action buttons for pending requests */}
                      {request.status === 'pending' && (
                        <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDeclineRequest(request.id)}
                            disabled={isProcessingAction}
                          >
                            Decline
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleAcceptRequest(request.id)}
                            disabled={isProcessingAction}
                          >
                            Accept & Assign Volunteer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Volunteer assignment dialog */}
      <Dialog open={isVolunteerDialogOpen} onOpenChange={setIsVolunteerDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Volunteer</DialogTitle>
            <DialogDescription>
              Enter volunteer details for food pickup
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="volunteerName">Volunteer Name</Label>
              <Input
                id="volunteerName"
                name="name"
                placeholder="Full name"
                value={volunteerData.name}
                onChange={handleVolunteerFormChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volunteerPhone">Phone Number</Label>
              <Input
                id="volunteerPhone"
                name="phone"
                type="tel"
                placeholder="Contact number"
                value={volunteerData.phone}
                onChange={handleVolunteerFormChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimatedArrival">Estimated Pickup Time</Label>
              <Input
                id="estimatedArrival"
                name="estimatedArrival"
                type="datetime-local"
                value={volunteerData.estimatedArrival}
                onChange={handleVolunteerFormChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsVolunteerDialogOpen(false)}
              disabled={isProcessingAction}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitVolunteerData}
              disabled={isProcessingAction}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessingAction ? "Assigning..." : "Assign & Accept"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
