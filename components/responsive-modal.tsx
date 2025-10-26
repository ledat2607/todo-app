"use client";

import { useState, useEffect } from "react";
import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
  children,
  onOpenChange,
  open,
}: ResponsiveModalProps) => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMedia("(min-width:1024px)", true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⚠️ tránh render trước khi client mount (fix ID mismatch)
  if (!mounted) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle asChild>
          <span></span>
        </DialogTitle>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTitle asChild>
        <span></span>
      </DrawerTitle>
      <DrawerContent>
        <div className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
