
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
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Printer, History, CreditCard, Users, Settings, LogOut } from "lucide-react";

export const AppSidebar: React.FC = () => {
  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <div className="flex items-center justify-start h-16 px-4">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4e054b52-31c9-4112-826b-b37f1e858bd5.png" 
              alt="Product Forge Logo" 
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold text-white">Product Forge</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Estimating">
                <Link to="/" className="text-sidebar-foreground hover:text-white">
                  <Printer className="h-5 w-5" />
                  <span>Estimating</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Quote History">
                <Link to="/quotes" className="text-sidebar-foreground hover:text-white">
                  <History className="h-5 w-5" />
                  <span>Quote History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Cost Configurator">
                <Link to="/cost-configurator" className="text-sidebar-foreground hover:text-white">
                  <CreditCard className="h-5 w-5" />
                  <span>Cost Configurator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="CRM">
                <Link to="/crm" className="text-sidebar-foreground hover:text-white">
                  <Users className="h-5 w-5" />
                  <span>CRM</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Account Settings">
                <Link to="/settings" className="text-sidebar-foreground hover:text-white">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="ghost" size="sm" className="w-full text-sidebar-foreground hover:text-white flex gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
