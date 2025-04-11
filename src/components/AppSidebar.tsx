
import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Printer, History, CreditCard, Users, Settings, LogOut } from "lucide-react";

export const AppSidebar: React.FC = () => {
  const { state } = useSidebar();

  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4e054b52-31c9-4112-826b-b37f1e858bd5.png" 
              alt="Product Forge Logo" 
              className="h-10 w-auto" // Increased logo size
            />
          </div>
          <SidebarTrigger className="text-white hover:text-accent" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-4"> {/* Added more space between items */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Estimating">
                <Link to="/" className="text-sidebar-foreground hover:text-white">
                  <Printer className="h-6 w-6" /> {/* Increased icon size */}
                  <span className="text-base">Estimating</span> {/* Increased text size */}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Quote History">
                <Link to="/quotes" className="text-sidebar-foreground hover:text-white">
                  <History className="h-6 w-6" />
                  <span className="text-base">Quote History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Cost Configurator">
                <Link to="/cost-configurator" className="text-sidebar-foreground hover:text-white">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-base">Cost Configurator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="CRM">
                <Link to="/crm" className="text-sidebar-foreground hover:text-white">
                  <Users className="h-6 w-6" />
                  <span className="text-base">CRM</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Account Settings">
                <Link to="/settings" className="text-sidebar-foreground hover:text-white">
                  <Settings className="h-6 w-6" />
                  <span className="text-base">Account Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="ghost" size="sm" className="w-full text-sidebar-foreground hover:text-white flex gap-2">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
