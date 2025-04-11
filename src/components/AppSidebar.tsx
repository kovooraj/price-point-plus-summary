
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
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Printer, History, CreditCard, Users, Settings } from "lucide-react";

export const AppSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center h-14 px-4">
          <Printer className="w-8 h-8 mr-2 text-primary" />
          <span className="text-lg font-bold">Product Forge</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Estimating">
                  <Link to="/">
                    <Printer className="h-5 w-5" />
                    <span>Estimating</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Quote History">
                  <Link to="/quotes">
                    <History className="h-5 w-5" />
                    <span>Quote History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Cost Configurator">
                  <Link to="/cost-configurator">
                    <CreditCard className="h-5 w-5" />
                    <span>Cost Configurator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="CRM">
                  <Link to="/crm">
                    <Users className="h-5 w-5" />
                    <span>CRM</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Account Settings">
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Account Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" size="sm" className="w-full">
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
