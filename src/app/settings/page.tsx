import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your application settings and preferences
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic application configuration options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Application Name</Label>
              <Input id="app-name" defaultValue="Configurator" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="app-description">Description</Label>
              <Input id="app-description" defaultValue="Your App Description" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="maintenance" />
              <Label htmlFor="maintenance">Maintenance Mode</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="notifications" defaultChecked />
              <Label htmlFor="notifications">Email Notifications</Label>
            </div>
            
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage security and authentication options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="two-factor" />
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="login-alerts" defaultChecked />
              <Label htmlFor="login-alerts">Login Alerts</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="password-expiry" />
              <Label htmlFor="password-expiry">Password Expiry (90 days)</Label>
            </div>
            
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Settings</CardTitle>
            <CardDescription>
              Configure database connection and backup options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="db-host">Database Host</Label>
              <Input id="db-host" defaultValue="localhost" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="db-port">Port</Label>
              <Input id="db-port" type="number" defaultValue="5432" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="auto-backup" defaultChecked />
              <Label htmlFor="auto-backup">Automatic Backups</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="ssl-connection" defaultChecked />
              <Label htmlFor="ssl-connection">SSL Connection</Label>
            </div>
            
            <Button variant="destructive" className="w-full">
              Test Connection
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>
              Manage API keys and rate limiting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" defaultValue="sk-1234567890abcdef" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate-limit">Rate Limit (requests/hour)</Label>
              <Input id="rate-limit" type="number" defaultValue="1000" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="api-logging" defaultChecked />
              <Label htmlFor="api-logging">API Request Logging</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="cors-enabled" defaultChecked />
              <Label htmlFor="cors-enabled">CORS Enabled</Label>
            </div>
            
            <Button variant="outline" className="w-full">
              Generate New API Key
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
