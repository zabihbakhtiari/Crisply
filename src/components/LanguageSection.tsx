
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LanguageSection: React.FC = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('utc');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [is24Hour, setIs24Hour] = useState('12h');

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your language and region preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language & Region</CardTitle>
        <CardDescription>Customize language and regional settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
              <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
              <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
              <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-format">Date Format</Label>
          <Select value={dateFormat} onValueChange={setDateFormat}>
            <SelectTrigger id="date-format">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
              <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
              <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Time Format</Label>
          <RadioGroup value={is24Hour} onValueChange={setIs24Hour} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12h" id="12h" />
              <Label htmlFor="12h">12-hour (AM/PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24h" id="24h" />
              <Label htmlFor="24h">24-hour</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
