import { Sidebar, SidebarProvider, SidebarContent, SidebarMenuButton, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronUp, Equal, Settings } from 'lucide-react'
import { User2 } from 'lucide-react'
import { Star, Search, Wand, HelpCircleIcon, LogOut } from 'lucide-react';
import Link from 'next/link'

export default function CandidateSidebar() {

  return (
    <div>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader> 
              <Card>
                <CardHeader className="flex-row items-center gap-x-2">
                    <Avatar>
                        <AvatarImage src={"remotifyeurope.png"} />
                        <AvatarFallback>DB</AvatarFallback>
                    </Avatar>
                    
                    <CardTitle>David Bushi</CardTitle>
                    
                </CardHeader>
                </Card>

            </SidebarHeader>
              <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href={"profile"}>
                                        <User2 />
                                            
                                        <span>{"My Profile"}</span>
                                    </a>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            <SidebarMenuItem >
                                <SidebarMenuButton asChild>
                                    <a href={"bookmarks"}>
                                        <Star />
                                        <span>{"My Bookmarks"}</span>
                                    </a>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                                
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <a href={"advanced-search"}>
                                            <Search />
                                            <span>{"Advanced Search"}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <a href={"my-matches"}>
                                            <Equal />
                                            <span>{"My Matches"}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <a href={"remotify-ai"}>
                                            <Wand />
                                            <span className='bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent'>{"Remotify AI"}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                

                        </SidebarMenu>

                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
              <SidebarFooter>
              <SidebarMenu>
                        
                <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href={"/"}>
                                <HelpCircleIcon />
                                <span>Help & Support</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href={"account"}>
                                <Settings />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="">
                            <a href={"/"}>
                                <LogOut color='red' />
                                <span className='text-red-600'>Sign Out</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
               
              </SidebarFooter>
            </Sidebar>
          </SidebarProvider>
          </div>
        )
        
      
}
