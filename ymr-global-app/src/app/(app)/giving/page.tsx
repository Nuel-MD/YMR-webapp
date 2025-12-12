'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreditCard, Wallet, Heart, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'

export default function GivingPage() {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('offering')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  
  // Replace with your actual public key from Paystack
  const publicKey = 'pk_test_YourPublicKeyHere' 

  // Simple validation
  const isValid = amount && parseFloat(amount) > 0 && email && name

  const componentProps = {
    email,
    amount: (parseFloat(amount || '0') * 100), // Paystack takes amount in kobo
    metadata: {
      name,
      phone,
      custom_fields: [
        {
          display_name: "Giving Type",
          variable_name: "giving_type",
          value: type
        }
      ]
    },
    publicKey,
    text: "Give Now",
    onSuccess: () => {
      alert("Thanks for your support! We have received your payment.")
      setAmount('')
      setEmail('')
      setName('')
      setPhone('')
    },
    onClose: () => alert("Transaction canceled"),
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/10 p-8 text-center space-y-2">
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Give Online</h1>
        <p className="text-muted-foreground max-w-xs mx-auto">
          "God loves a cheerful giver." - 2 Corinthians 9:7
        </p>
      </div>

      <div className="p-6 -mt-6">
        <Card className="p-6 space-y-6 shadow-lg border-border/50">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Giving Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tithe">Tithe</SelectItem>
                  <SelectItem value="offering">Offering</SelectItem>
                  <SelectItem value="seed">Seed Faith</SelectItem>
                  <SelectItem value="project">Project Support</SelectItem>
                  <SelectItem value="ymr">YMR Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                type="email"
                placeholder="john@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number (Optional)</Label>
              <Input 
                type="tel"
                placeholder="+234..." 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Amount (NGN)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₦</span>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-8 text-lg font-semibold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['1000', '5000', '10000'].map((val) => (
                <Button 
                  key={val} 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAmount(val)}
                  className={amount === val ? 'border-primary bg-primary/5' : ''}
                >
                  ₦{parseInt(val).toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          <PaystackHookExample {...componentProps} disabled={!isValid} />

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3 w-3" />
            <span>Secure payment processing by Paystack</span>
          </div>
        </Card>

        {/* Recent Transactions Placeholder */}
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Recent Giving</h3>
          <Card className="p-4 flex items-center justify-between opacity-60">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Wallet className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Offering</p>
                <p className="text-xs text-muted-foreground">Oct 24, 2023</p>
              </div>
            </div>
            <span className="font-semibold">₦5,000</span>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PaystackHookExample({ disabled, ...componentProps }: any) {
    const initializePayment = usePaystackPayment(componentProps);
    return (
      <Button 
        disabled={disabled}
        onClick={() => {
            initializePayment({
                onSuccess: componentProps.onSuccess,
                onClose: componentProps.onClose
            })
        }}
        className="w-full h-12 text-lg font-semibold bg-[#0BA4DB] hover:bg-[#0BA4DB]/90 text-white"
      >
        <CreditCard className="mr-2 h-5 w-5" />
        Give Now
      </Button>
    );
}
