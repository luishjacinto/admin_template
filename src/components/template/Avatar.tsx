/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'

interface AvatarProps {
    className?: string
}

export default function Avatar(props: AvatarProps) {
    const { user } = useAuth()

    return (
        <Link href="/perfil" clas>
            <img
                src={user?.imageUrl ?? "/images/avatar.svg"}
                alt="Avatar do usuário"
                className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}
            />
        </Link>
    )
}