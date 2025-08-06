import { Package, Boxes, Users, Truck, ReceiptEuro, Megaphone, Share2, Tag } from "lucide-react";

const GROUPED_MENUS = [
  {
    namespace: "Magasin",
    menus: [
      {
        title: "Articles",
        icon: Package,
        items: [
          { title: "Gestion", href: "/" }
        ]
      },
      {
        title: "Stocks",
        icon: Boxes,
        items: [
          { title: "Gestion", href: "/" }
        ]
      },
      {
        title: "Clients",
        icon: Users,
        items: [
          { title: "Gestion", href: "/" }
        ]
      },
      {
        title: "Commandes",
        icon: Truck,
        items: [
          { title: "Gestion", href: "/" }
        ]
      }
    ]
  },
  {
    namespace: "Comptabilité",
    menus: [
      {
        title: "Factures",
        icon: ReceiptEuro,
        items: [
          { title: "Gestion", href: "/" }
        ]
      }
    ]
  },
  {
    namespace: "Réseau",
    menus: [
      {
        title: "Communication",
        icon: Megaphone,
        items: [
          { title: "Gestion", href: "/" }
        ]
      },
      {
        title: "Centre de partage",
        icon: Share2,
        items: [
          { title: "Gestion", href: "/" }
        ]
      }
    ]
  },
  {
    namespace: "Outils",
    menus: [
      {
        title: "Étiquettes",
        icon: Tag,
        items: [
          { title: "Gestion", href: "/" }
        ]
      }
    ]
  },
];

export default function Sidebar()
{
  return(
    <aside className="flex flex-col bg-[#fff5e3]/15 border-r border-r-base-300 w-64">
      <header className="bg-base-200">
        <a className="flex items-center justify-center h-12 p-2 text-sm" href="/">
          On verra plus tard pour ça
        </a>
      </header>

      {GROUPED_MENUS.map((group, groupId) => (
        <nav className="menu text-base-content w-full pb-0">
          <span className="menu-title text-[#f18a23]/90 text-[.75em] font-bold uppercase">{group.namespace}</span>
          
          {group.menus.map((menu, menuId) => (
            <ul>
              <li>
                <details open={groupId === 0 && menuId === 0}>
                  <summary>
                    <menu.icon className="size-[1.25em]"/>
                    {menu.title}
                  </summary>

                  <ul>
                    {menu.items.map((link) => (
                      <li key={link.title}>
                        <a href={link.href}>
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          ))}
        </nav>
      ))}

      <footer className="flex items-center mt-auto p-4 gap-2 bg-base-300 border-t border-t-base-300">
        <div className="avatar avatar-online">
          <div className="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <span className="text-xs font-bold">AHSSBAHSD Aosdisdj</span>
          <span className="text-xs">xxaddada.iodhjfhdf@example.com</span>
        </div>
      </footer>
    </aside>
  );
};