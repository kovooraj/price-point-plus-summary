import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Printer, History, CreditCard, Users, Settings, LogOut } from "lucide-react";
export const AppSidebar: React.FC = () => {
  const {
    state,
    toggleSidebar
  } = useSidebar();
  return <Sidebar className="border-none" collapsible="icon" // Change from "offcanvas" to "icon" to show icons when collapsed
  >
      <SidebarHeader>
        <div className="flex items-center justify-between h-20 py-[50px] px-[10px]">
          <div className="flex items-center gap-2">
            <img alt="Product Forge Logo" className="h-auto w-[80%] object-contain" src="/lovable-uploads/803cbb9a-bad5-421d-af7f-dd069edb7bb7.png" />
          </div>
          <SidebarTrigger onClick={toggleSidebar} className="text-white hover:text-accent" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-6"> {/* Increased spacing between menu items */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Estimating">
                <Link to="/" className="text-sidebar-foreground hover:text-white">
                  <Printer className="h-7 w-7" /> {/* Increased icon size more */}
                  <span className="text-base ml-2">Estimating</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Quote History">
                <Link to="/quotes" className="text-sidebar-foreground hover:text-white">
                  <History className="h-7 w-7" />
                  <span className="text-base ml-2">Quote History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Cost Configurator">
                <Link to="/cost-configurator" className="text-sidebar-foreground hover:text-white">
                  <CreditCard className="h-7 w-7" />
                  <span className="text-base ml-2">Cost Configurator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="CRM">
                <Link to="/crm" className="text-sidebar-foreground hover:text-white">
                  <Users className="h-7 w-7" />
                  <span className="text-base ml-2">CRM</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Account Settings">
                <Link to="/settings" className="text-sidebar-foreground hover:text-white">
                  <Settings className="h-7 w-7" />
                  <span className="text-base ml-2">Account Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="ghost" size="sm" className="w-full text-sidebar-foreground hover:text-white flex gap-2">
            <LogOut className="h-6 w-6" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>;
};