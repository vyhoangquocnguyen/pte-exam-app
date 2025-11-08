import Link from "next/link";
import { navItems } from "@/lib/constants";
import { ChevronDown, Library } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Sidebar = () => {
  const currentPath = "/dashboard";
  return (
    <div className="hidden border-r bg-muted/40 md:block min-h-screen">
      <div className="flex h-16 items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Library className="h-6 w-6 text-primary" />
          <span>PTE Learning</span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)] px-2 py-4">
        <nav className="grid gap-2 text-sm font-medium lg:px-4">
          {navItems.map(({ title, href, submenu, icon: NavIcon }) =>
            submenu ? (
              <Collapsible key={title}>
                <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <div className="flex items-center gap-3">
                    <NavIcon className="h-4 w-4" />
                    {title}
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-7 mt-1 grid gap-1 border-l-2 border-muted pl-4">
                    {submenu.map(({ title, href }) => (
                      <Link
                        key={title}
                        href={href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">
                        {title}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                key={title}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                              ${
                                currentPath === href
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-primary"
                              }`}>
                <NavIcon className="h-4 w-4" />
                {title}
              </Link>
            )
          )}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
