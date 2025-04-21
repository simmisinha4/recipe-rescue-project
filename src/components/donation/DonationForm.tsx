
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChefHat, Clock, MapPin, Package, Phone, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FOOD_TYPES = [
  "Cooked Meals",
  "Baked Goods",
  "Fruits & Vegetables",
  "Desserts",
  "Beverages",
  "Snacks",
  "Other"
];

const DonationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    quantityUnit: "servings",
    foodType: "",
    expiryTime: "",
    address: "",
    city: "",
    pincode: "",
    contactName: "",
    contactPhone: "",
    description: "",
    image: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here we would normally send data to the server
      // Since we don't have a backend connected yet, we'll simulate a successful submission
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
      
      toast({
        title: "Donation submitted successfully!",
        description: "You'll be notified when an NGO accepts your donation.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        foodName: "",
        quantity: "",
        quantityUnit: "servings",
        foodType: "",
        expiryTime: "",
        address: "",
        city: "",
        pincode: "",
        contactName: "",
        contactPhone: "",
        description: "",
        image: null
      });
      setImagePreview(null);
      
    } catch (error) {
      toast({
        title: "Error submitting donation",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-2xl flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-green-600" />
          Donate Food
        </CardTitle>
        <CardDescription>
          Share your surplus food with those in need
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Food Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foodName">Food Name</Label>
                <Input
                  id="foodName"
                  name="foodName"
                  placeholder="E.g., Homemade Pasta"
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    placeholder="Amount"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantityUnit">Unit</Label>
                  <Select
                    value={formData.quantityUnit}
                    onValueChange={(value) => handleSelectChange("quantityUnit", value)}
                  >
                    <SelectTrigger id="quantityUnit">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="servings">Servings</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="lb">Pounds</SelectItem>
                      <SelectItem value="items">Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foodType">Type of Food</Label>
                <Select 
                  value={formData.foodType}
                  onValueChange={(value) => handleSelectChange("foodType", value)}
                  required
                >
                  <SelectTrigger id="foodType">
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FOOD_TYPES.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryTime" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Best Before
                </Label>
                <Input
                  id="expiryTime"
                  name="expiryTime"
                  type="datetime-local"
                  value={formData.expiryTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add any details about the food, allergens, etc."
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="foodImage">Food Image (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  id="foodImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                
                {imagePreview && (
                  <div className="relative border rounded-md overflow-hidden h-32 bg-gray-50">
                    <img
                      src={imagePreview}
                      alt="Food preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Pickup Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode/ZIP"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">
                  <User className="h-4 w-4 inline mr-1" />
                  Contact Name
                </Label>
                <Input
                  id="contactName"
                  name="contactName"
                  placeholder="Your name"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6 bg-gray-50">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Donation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DonationForm;
