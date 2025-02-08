import React from 'react'

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router';
import { useUser } from '@/context/UserContext';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";

const NavBar : React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  return (
    <div className="w-full flex justify-between py-4 items-center pagePadding sticky top-0 z-50 backdrop-blur-lg">
            <div className="w-full  flex mx-auto justify-between items-center">
            <Link to="/" >
                <h1 className="text-2xl font-semibold tracking-wide">Eventer</h1>
            </Link>
            <div className="hidden md:flex gap-6 min-w-fit">
                <a href="/events" className="hover:translate-y-1 transition-all ease-in-out duration-200">Events</a>
                <a href="" className="hover:translate-y-1 transition-all ease-in-out duration-200">Contact Us</a>
                <a href="" className="hover:translate-y-1 transition-all ease-in-out duration-200">About Us</a>
            </div>
            <div className="hidden md:flex gap-4 min-w-fit">
            {user ? (
            // <button 
            //   onClick={logout} 
            //   className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-base text-white font-semibold transition-all ease-in-out duration-150"
            // >
            //   Logout
            // </button>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open account menu">
                <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64">
              <DropdownMenuLabel className="flex flex-col">
                <span>Signed in as</span>
                <span className="text-xs font-normal text-foreground">{user.username}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <Link to="/login">
              <button className="bg-[#7F56D9] hover:bg-[#6941c6] px-4 py-2 rounded-md text-base text-white font-semibold transition-all ease-in-out duration-150">
                Log In
              </button>
            </Link>
          )}
                <ModeToggle/>
            </div>

            </div>
            <div>
                {!isOpen && (
                <MenuIcon className="md:hidden z-30 absolute right-10 top-4" onClick={toggleMenu}/>
                
                )}
                {isOpen && (
                <X className="md:hidden z-30 absolute right-10 top-4" onClick={toggleMenu}/>
                )}
            </div>
            {isOpen && (
            <div className=" h-screen w-screen absolute top-0 right-0 z-20 backdrop-blur-md p-10 mt-16">
                
                <div className="flex flex-col gap-6 min-w-fit">
                    <a href="/events" className="hover:text-[#344054]">Events</a>
                    <a href="" className="hover:text-[#344054]">Contact Us</a>
                    <a href="" className="hover:text-[#344054]">About Us</a>  
                    {user ? (
              <button 
                onClick={logout} 
                className="bg-red-500 text-white text-base px-4 py-2 rounded-md font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-white text-[#7F56D9] text-base px-4 py-2 rounded-md font-semibold">
                  Log in
                </button>
              </Link>
            )}
                </div>
                
            </div>)}
        </div>
  )
}

export default NavBar



