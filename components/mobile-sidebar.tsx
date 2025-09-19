import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet"
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
    const [isOpen,setIsOpen] = useState(false)
    const pathName = usePathname();

    useEffect(() => {
      setIsOpen(false);
    }, [pathName])
    

    return (
      <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="lg:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {/* Header ẩn hoặc hiển thị tiêu đề */}
          <SheetHeader>
            <SheetTitle className="sr-only">Sidebar Navigation</SheetTitle>
          </SheetHeader>

          <Sidebar />
        </SheetContent>
      </Sheet>
    );
}
