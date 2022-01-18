import { Theme } from '../../types/Theme'
import {
    IconSun,
    IconMoon
} from '../icons/index'


interface ChangeThemeButtonProps {
    theme: Theme
    changeTheme: () => void
}

export default function ChangeThemeButton(props: ChangeThemeButtonProps){

    return (
        props.theme === 'dark' ? (
            <div onClick={props.changeTheme} className={`
                hidden sm:flex items-center cursor-pointer
                bg-gradient-to-r from-yellow-300 to-yellow-600
                w-14 lg:w-24 h-8 p-1 rounded-full
            `}>
                <div className={`
                    flex items-center justify-center
                    bg-white text-yellow-600
                    rounded-full w-6 h-6
                `}>
                    {IconSun(4)}
                </div>
                <div className={`
                    hidden lg:flex items-center ml-4
                    text-white
                `}>
                    <span>Claro</span>
                </div>
            </div>
        ) : (
            <div onClick={props.changeTheme} className={`
                hidden sm:flex items-center justify-end cursor-pointer
                bg-gradient-to-r from-gray-600 to-gray-900
                w-14 lg:w-24 h-8 p-1 rounded-full
            `}>
                <div className={`
                    hidden lg:flex items-center mr-2
                    text-gray-300
                `}>
                    <span>Escuro</span>
                </div>
                <div className={`
                    flex items-center justify-center
                    bg-black text-yellow-200
                    rounded-full w-6 h-6
                `}>
                    {IconMoon(4)}
                </div>
            </div>
        )
    )
}