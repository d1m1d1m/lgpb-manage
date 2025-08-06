import { BoxesIcon, Package2Icon, ReceiptEuroIcon, UsersIcon } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
 
// Menu items.
const menuGroups = [
  {
    title: "Magasin",
    menu: [
      {
        title: "Articles",
        icon: Package2Icon,
        items: [
          { title: "Gestion", href: "#" }
        ]
      },
      {
        title: "Stocks",
        icon: BoxesIcon,
        items: [
          { title: "Mouvements", href: "#" }
        ]
      },
      {
        title: "Clients",
        icon: UsersIcon,
        items: [
          { title: "Gestion", href: "#" }
        ]
      },
      {
        title: "Facturation",
        icon: ReceiptEuroIcon,
        items: [
          { title: "Gestion", href: "#" }
        ]
      },
    ]
  },
  {
    title: "Réseau",
    menu: []
  }
];
 
export function AppSidebar() {
  return (
    <Sidebar>      
      <SidebarContent>
        {menuGroups.map((menuGroup) => (
          <SidebarGroup key={menuGroup.title}>
            <SidebarGroupLabel>{menuGroup.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              {menuGroup.menu.map((menu, i) => (
                <SidebarMenu key={menu.title}>
                  <Collapsible defaultOpen={i === 0} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <menu.icon/>
                          {menu.title}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {menu.items.map((subItems) => (
                            <SidebarMenuSubItem key={subItems.title}>
                              <SidebarMenuButton asChild>
                                <a href={subItems.href}>
                                  {subItems.title}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}