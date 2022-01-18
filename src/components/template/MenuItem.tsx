import Link from 'next/link'

interface MenuItemProps {
    text: string
    icon: any
    url?: string
    className?: string
    onClick?: (event: any) => any
}

export default function MenuItem(props: MenuItemProps) {

    function renderLink(){
        return (
            <a className={`
                flex flex-col justify-center items-center
                w-20 h-20
                dark:text-gray-200
                ${props.className}
            `}>
                {props.icon}
                <span className={`
                    text-xs font-light text-gray-600
                `}>
                    {props.text}
                </span>
            </a>
        )
    }

    return (
        <li
            onClick={props.onClick}
            className={`
                hover:bg-gray-100 dark:hover:bg-gray-800
                cursor-pointer
            `}
        >
            {props.url ? (
                <Link href={props.url}>
                    {renderLink()}
                </Link>
            ) : (renderLink())}
        </li>
    )
}