import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  MessageSquare,
  Search,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const userRole = "admin"
const currentUser = {
  name: "María García",
  email: "maria.garcia@universidad.edu",
  avatar: "https://ui-avatars.com/api/?name=MG&background=00a19a&color=fff",
}

const userMenuItems = [
  { title: "Competencias ESCO", url: "/usuario/competencias", icon: BookOpen },
  { title: "Ocupaciones ESCO", url: "/usuario/ocupaciones", icon: Users },
  { title: "Foro", url: "/usuario/foro", icon: MessageSquare },
  { title: "Buscador ESCO", url: "/usuario/buscador", icon: Search },
]

const adminMenuItems = [
  { title: "Usuarios", url: "/usuarios", icon: Users },
  { title: "Estadísticas", url: "/estadisticas", icon: BarChart3 },
]

const SideBar = () => {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isActive = (url) => location.pathname === url

  return (
    <>
      {/* Botón flotante móvil */}
      <button
        className={
          "!fixed !z-50 md:!hidden !bg-[#00a19a] !text-white !p-2 !rounded-full !transition-all !duration-300 !ease-in-out " +
          (isMobileOpen
            ? "!left-[15.5rem] !top-1/2 !-translate-y-1/2"
            : "!left-2 !top-1/2 !-translate-y-1/2")
        }
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Backdrop en móvil */}
      {isMobileOpen && (
        <div
          className="fixed !inset-0 !bg-black/40 !z-30 md:!hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={
          "!bg-white !border-r !border-gray-200 !z-40 !flex !flex-col !transition-all !duration-300 " +
          (isMobileOpen
            ? "!fixed !w-64 !h-screen !left-0 !top-0 !translate-x-0 md:!static md:!w-64 md:!flex"
            : "!fixed !w-64 !h-screen -!translate-x-full !hidden md:!flex md:!static md:!w-64 md:!translate-x-0")
        }
      >
        {/* Header */}
        <div className="!flex !items-center !gap-2 !px-4 !py-4 !border-b !shrink-0">
          <div className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg !bg-[#00a19a] !text-white !font-bold">
            E
          </div>
          <div>
            <p className="!text-sm !font-semibold">ESCO para todos</p>
            <p className="!text-xs !text-muted-foreground">Intranet</p>
          </div>
        </div>

        {/* Menú principal con scroll independiente */}
        <div className="!flex-1 !overflow-auto !px-2 !py-4">
          <p className="!text-xs !font-medium !text-muted-foreground !mb-2">Principal</p>
          <nav className="!flex !flex-col !gap-1">
            {userMenuItems.map(({ title, url, icon: Icon }) => {
              const active = isActive(url)
              return (
                <Link
                  key={url}
                  to={url}
                  className={
                    "!flex !items-center !gap-2 !px-3 !py-2 !rounded-md !text-sm hover:!bg-gray-100 " +
                    (active
                      ? "!bg-gray-100 !font-semibold !text-black"
                      : "!text-[#333333]")
                  }
                >
                  <Icon
                    size={18}
                    className={active ? "!text-black" : "!text-[#333333]"}
                  />
                  {title}
                </Link>
              )
            })}
          </nav>

          {userRole === "admin" && (
            <>
              <p className="!text-xs !font-medium !text-muted-foreground !mt-6 !mb-2">Administración</p>
              <nav className="!flex !flex-col !gap-1">
                {adminMenuItems.map(({ title, url, icon: Icon }) => {
                  const active = isActive(url)
                  return (
                    <Link
                      key={url}
                      to={url}
                      className={
                        "!flex !items-center !gap-2 !px-3 !py-2 !rounded-md !text-sm hover:!bg-gray-100 " +
                        (active
                          ? "!bg-gray-100 !font-semibold !text-black"
                          : "!text-[#333333]")
                      }
                    >
                      <Icon
                        size={18}
                        className={active ? "!text-black" : "!text-[#333333]"}
                      />
                      {title}
                    </Link>
                  )
                })}
              </nav>
            </>
          )}
        </div>

        {/* Footer solo móvil */}
        <div className="md:!hidden !border-t !px-3 !py-2 !shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="!flex !items-center !gap-2 !w-full !px-2 !py-2 !rounded-md hover:!bg-gray-100">
                <Avatar className="!h-6 !w-6">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div className="!flex !flex-col !text-left">
                  <span className="!text-sm !font-medium">{currentUser.name}</span>
                  <span className="!text-xs !text-muted-foreground">
                    {userRole === "admin" ? "Administrador" : "Usuario"}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="!w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <Settings className="!mr-2 !h-4 !w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="!mr-2 !h-4 !w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  )
}

export default SideBar
