import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>'
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col w-64 p-0">
          {/* <MobileSidebar/> */}
        </SheetContent>
      </Sheet>

      {/* Desktop Search Bar */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shawdow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
        {/* <UserProfile /> */}
      </div>
    </header>
  );
};

export default NavBar;
