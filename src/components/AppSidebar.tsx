import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Printer, History, CreditCard, Users, Settings, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
export const AppSidebar: React.FC = () => {
  const {
    state,
    toggleSidebar
  } = useSidebar();
  const {
    theme,
    setTheme
  } = useTheme();
  const isCollapsed = state === "collapsed";
  return <Sidebar className="border-none" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-start h-24 pb-4 pt-3 px-0">
          {isCollapsed ? <img alt="Logo Small" src="/lovable-uploads/ce711eba-4472-4e17-a6f8-e612fc753438.png" className="h-12 w-12 object-contain" /> : <img alt="Logo Full" className="h-auto w-[85%] max-h-[50px] object-contain" src="/lovable-uploads/803cbb9a-bad5-421d-af7f-dd069edb7bb7.png" />}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-8">
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Estimating">
                <Link to="/" className="text-sidebar-foreground hover:text-white">
                  <Printer className="h-8 w-8" />
                  <span className="text-base ml-2">Estimating</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Quote History">
                <Link to="/quotes" className="text-sidebar-foreground hover:text-white">
                  <History className="h-8 w-8" />
                  <span className="text-base ml-2">Quote History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Cost Configurator">
                <Link to="/cost-configurator" className="text-sidebar-foreground hover:text-white">
                  <CreditCard className="h-8 w-8" />
                  <span className="text-base ml-2">Cost Configurator</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="CRM">
                <Link to="/crm" className="text-sidebar-foreground hover:text-white">
                  <Users className="h-8 w-8" />
                  <span className="text-base ml-2">CRM</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Account Settings">
                <Link to="/settings" className="text-sidebar-foreground hover:text-white">
                  <Settings className="h-8 w-8" />
                  <span className="text-base ml-2">Account Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 flex flex-col gap-4 px-0">
          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-3 hover:bg-sidebar-accent/20 cursor-pointer rounded px-3 py-2 ${isCollapsed ? 'justify-center w-full' : 'px-[15px] py-[8px] w-full'}`}>
                <Avatar className="h-9 w-9 border border-sidebar-border">
                  <AvatarImage src="/lovable-uploads/a000a88c-c4e3-4a81-8756-37a6d5fdfd9a.png" className="object-fill" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                {!isCollapsed && <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white">Alex Kovoor</span>
                    <span className="text-xs text-gray-400">Admin</span>
                  </div>}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sidebar footer buttons */}
          <div className={`flex ${isCollapsed ? 'flex-col' : 'flex-row'} gap-2 px-3`}>
            {/* Theme toggle button */}
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="ghost" size="icon" aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light Mode" : "Dark Mode"} className="h-9 w-2 rounded-md text-sidebar-foreground hover:text-white transition-colors py-0 bg-[#00ba00]/0">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {/* Sidebar collapse button */}
            <Button onClick={toggleSidebar} variant="ghost" size={isCollapsed ? "icon" : "sm"} className={`rounded-md text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-white flex items-center justify-start transition-colors ${isCollapsed ? "h-9 w-9" : "h-9"}`}>
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span className="text-sm">Collapse</span>
                </>}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>;
};