import MenuItem from "./MenuItem"
import Logo from "./Logo"
import {
    IconHome,
    IconAdjustments,
    IconBell,
    IconLogout
} from "../icons"
import useAuth from "../../data/hook/useAuth"

export default function SideMenu(){
    const { logout } = useAuth()

    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900 dark:text-gray-200
        `}>
            <div className={`
                h-20 w-20
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-500
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url={'/'} text={'Página Inicial'} icon={IconHome} />
                <MenuItem url={'ajustes'} text={'Ajustes'} icon={IconAdjustments} />
                <MenuItem url={'notificacoes'} text={'Notificações'} icon={IconBell} />
            </ul>
            <ul>
                <MenuItem
                    text={'Sair'}
                    icon={IconLogout}
                    onClick={logout}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 dark:hover:text-white
                        hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
}