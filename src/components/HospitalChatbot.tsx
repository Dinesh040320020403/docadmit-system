import { useState } from "react";
import { MessageCircle, X, Send, Bot, User, Phone, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const HospitalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your hospital assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { label: "Book Appointment", icon: Calendar, action: "book_appointment" },
    { label: "Emergency Contact", icon: Phone, action: "emergency" },
    { label: "Find Location", icon: MapPin, action: "location" },
    { label: "Operating Hours", icon: Clock, action: "hours" }
  ];

  const botResponses: Record<string, string> = {
    "book_appointment": "I can help you book an appointment! Please visit our booking page or call us at (555) 123-4567.",
    "emergency": "For medical emergencies, please call 911 immediately. For urgent but non-life-threatening situations, call our emergency line: (555) 999-8888.",
    "location": "We're located at 123 Medical Center Drive, City, State 12345. We have parking available and are accessible by public transport.",
    "hours": "Our operating hours are:\nMonday-Friday: 7:00 AM - 10:00 PM\nSaturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 6:00 PM\nEmergency services are available 24/7.",
    "default": "I understand you need help. For specific medical questions, please consult with our medical staff. I can help with appointments, directions, hours, and general information."
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple bot response logic
    setTimeout(() => {
      let botResponse = botResponses.default;
      
      const lowercaseInput = inputValue.toLowerCase();
      if (lowercaseInput.includes("appointment") || lowercaseInput.includes("book")) {
        botResponse = botResponses.book_appointment;
      } else if (lowercaseInput.includes("emergency") || lowercaseInput.includes("urgent")) {
        botResponse = botResponses.emergency;
      } else if (lowercaseInput.includes("location") || lowercaseInput.includes("address") || lowercaseInput.includes("where")) {
        botResponse = botResponses.location;
      } else if (lowercaseInput.includes("hours") || lowercaseInput.includes("time") || lowercaseInput.includes("open")) {
        botResponse = botResponses.hours;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue("");
  };

  const handleQuickAction = (action: string) => {
    const response = botResponses[action] || botResponses.default;
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: response,
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            size="icon"
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-h-[80vh]">
          <Card className="h-full flex flex-col shadow-2xl border-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Hospital Assistant</h3>
                    <p className="text-white/80 text-sm">Always here to help</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-b bg-muted/30">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs hover:bg-primary/10 hover:border-primary/30"
                  >
                    <action.icon className="h-3 w-3 mr-1" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === "user" 
                      ? "bg-primary text-white" 
                      : "bg-muted"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`max-w-[75%] ${
                    message.sender === "user" ? "text-right" : ""
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                For medical emergencies, call 911 immediately
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default HospitalChatbot;