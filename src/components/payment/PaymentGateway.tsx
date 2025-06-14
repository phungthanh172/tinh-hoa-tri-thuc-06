
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Shield, CreditCard, Lock, Globe, AlertTriangle, CheckCircle } from 'lucide-react';

const PaymentGateway = ({ orderTotal = 99.99, currency = 'USD' }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: ''
  });
  const [saveCard, setSaveCard] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, popular: true },
    { id: 'paypal', name: 'PayPal', icon: CreditCard },
    { id: 'apple-pay', name: 'Apple Pay', icon: CreditCard },
    { id: 'google-pay', name: 'Google Pay', icon: CreditCard }
  ];

  const supportedCards = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'American Express', icon: '💳' },
    { name: 'Discover', icon: '💳' }
  ];

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'AU', name: 'Australia' },
    { code: 'JP', name: 'Japan' }
  ];

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(.{4})/g, '$1 ');
    value = value.trim();
    setCardDetails({ ...cardDetails, number: value });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'Mastercard';
    if (cleaned.startsWith('3')) return 'American Express';
    if (cleaned.startsWith('6')) return 'Discover';
    return null;
  };

  const validateCard = () => {
    const errors = [];
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 13) {
      errors.push('Invalid card number');
    }
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      errors.push('Invalid expiry date');
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      errors.push('Invalid CVV');
    }
    if (!cardDetails.name.trim()) {
      errors.push('Cardholder name required');
    }
    return errors;
  };

  const handlePayment = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    const errors = validateCard();
    if (errors.length > 0) {
      alert('Please correct the following errors:\n' + errors.join('\n'));
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      alert('Payment processed successfully!');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Security Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Secure Checkout</h3>
              <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
            </div>
            <div className="ml-auto flex space-x-2">
              <Badge className="bg-green-100 text-green-800">SSL</Badge>
              <Badge className="bg-green-100 text-green-800">PCI DSS</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => {
              const MethodIcon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === method.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === method.id 
                        ? 'border-purple-500 bg-purple-500' 
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5" />
                      )}
                    </div>
                    <MethodIcon className="w-5 h-5" />
                    <span className="font-medium">{method.name}</span>
                    {method.popular && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Popular</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Supported Cards */}
          <div className="flex items-center space-x-4 pt-4 border-t">
            <span className="text-sm text-gray-600">Accepted cards:</span>
            <div className="flex space-x-2">
              {supportedCards.map((card, index) => (
                <div key={index} className="flex items-center space-x-1 text-sm">
                  <span>{card.icon}</span>
                  <span className="text-gray-600">{card.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="pr-12"
                />
                {detectCardType(cardDetails.number) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-gray-500">{detectCardType(cardDetails.number)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="save-card" 
                checked={saveCard}
                onCheckedChange={setSaveCard}
              />
              <Label htmlFor="save-card" className="text-sm">
                Save this card for future purchases
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Billing Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={billingAddress.country} onValueChange={(value) => setBillingAddress({ ...billingAddress, country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                placeholder="State or Province"
                value={billingAddress.state}
                onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={billingAddress.city}
                onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="zip">ZIP/Postal Code</Label>
              <Input
                id="zip"
                placeholder="ZIP Code"
                value={billingAddress.zipCode}
                onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Street address"
              value={billingAddress.address}
              onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${(orderTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>${(orderTotal * 1.08).toFixed(2)} {currency}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Payment */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
            </Label>
          </div>

          <Button 
            onClick={handlePayment}
            disabled={processing || !agreedToTerms}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400"
            size="lg"
          >
            {processing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Complete Payment ${(orderTotal * 1.08).toFixed(2)}</span>
              </div>
            )}
          </Button>

          {/* Security Features */}
          <div className="flex justify-center space-x-6 text-xs text-gray-600 pt-4 border-t">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentGateway;
