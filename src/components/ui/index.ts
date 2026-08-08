/**
 * UI Components Index - shadcn/ui + custom UI components
 * Central export point for all reusable UI components
 */

// Layout primitives
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";
export { Alert, AlertTitle, AlertDescription } from "./alert";
export { AspectRatio } from "./aspect-ratio";

// Media
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";
export { Badge } from "./badge";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

// Interactive
export { Button, buttonVariants } from "./button";
export { Calendar } from "./calendar";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./card";
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";
export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./chart";
export { Checkbox } from "./checkbox";
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./command";

// Menus & Dropdowns
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "./context-menu";
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";
export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./dropdown-menu";

// Forms
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form";
export { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
export { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
export { Input } from "./input";
export { Label } from "./label";

// Navigation
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarPortal,
} from "./menubar";
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./navigation-menu";
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

// Popovers & Tooltips
export { Popover, PopoverTrigger, PopoverContent } from "./popover";
export { Progress } from "./progress";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export { Resizable, ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";
export { ScrollArea, ScrollBar } from "./scroll-area";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";
export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarInput,
  useSidebar,
} from "./sidebar";
export { Skeleton } from "./skeleton";
export { Slider } from "./slider";
export { Toaster as Sonner } from "./sonner";
export { Switch } from "./switch";

// Data Display
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export { Textarea } from "./textarea";
export { Toggle, toggleVariants } from "./toggle";
export { ToggleGroup } from "./toggle-group";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
