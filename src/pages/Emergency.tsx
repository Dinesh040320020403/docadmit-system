import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-rose-50 to-orange-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="rounded-xl bg-red-600 text-white p-6 sm:p-8 shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold">Emergency Care</h1>
          <p className="mt-2 text-white/90">Immediate assistance and emergency contacts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Call the numbers below for urgent medical help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Hospital Emergency Line</p>
                <p className="text-sm text-muted-foreground">24/7 immediate response</p>
              </div>
              <Button asChild>
                <a href="tel:+1800123456">
                  <Phone className="h-4 w-4 mr-2" />
                  Call +1 800 123 456
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Ambulance</p>
                <p className="text-sm text-muted-foreground">Rapid transport service</p>
              </div>
              <Button asChild>
                <a href="tel:108">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 108
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>What to do right now</CardTitle>
              <CardDescription>Follow these steps while help is on the way</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Stay calm and ensure your surroundings are safe.</li>
                <li>Call emergency services and provide your exact location.</li>
                <li>Do not move the patient if there’s a suspected spinal injury.</li>
                <li>If trained, begin CPR or first aid as needed.</li>
                <li>Prepare ID, medical history, and medication list.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Critical symptoms</CardTitle>
              <CardDescription>Seek immediate care if you notice these</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="rounded-md border p-3">Chest pain or pressure</div>
                <div className="rounded-md border p-3">Severe shortness of breath</div>
                <div className="rounded-md border p-3">Uncontrolled bleeding</div>
                <div className="rounded-md border p-3">Sudden weakness/numbness</div>
                <div className="rounded-md border p-3">Loss of consciousness</div>
                <div className="rounded-md border p-3">Seizures or head injury</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Location & Access</CardTitle>
            <CardDescription>Nearest entrance and parking for emergency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Emergency Entrance:</strong> Gate B, off Healthcare Ave</p>
                <p><strong>Parking:</strong> E-Parking levels 1–2 (first 30 mins free)</p>
                <p><strong>Check-in:</strong> Triage desk to the right upon entry</p>
              </div>
              <div className="aspect-video rounded-md overflow-hidden border">
                <iframe
                  title="Emergency Location"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531664!3d-37.81627974262757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHospital!5e0!3m2!1sen!2s!4v1614030000000"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;




