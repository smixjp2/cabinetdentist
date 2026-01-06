import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search } from "lucide-react"
import { Input } from "../ui/input"

type HeaderProps = {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
                <form className="hidden w-full max-w-sm lg:flex">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher patient..."
                            className="w-full rounded-lg bg-background pl-9"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src="https://picsum.photos/seed/doc/100/100" alt="Dr. Alaoui" />
                                <AvatarFallback>DA</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Dr. Alaoui</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    d.alaoui@denticare.ma
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profil</DropdownMenuItem>
                        <DropdownMenuItem>Paramètres</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
