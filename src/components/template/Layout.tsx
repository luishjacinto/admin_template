import SideMenu from "./SideMenu"
import Header from "./Header"
import Content from "./Content"
import useAppData from '../../data/hook/useAppData'
import AuthRoute from '../auth/AuthRoute'
interface LayoutProps {
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps){
    const { theme } = useAppData()

    return (
        <AuthRoute>
            <title>{props.title}</title>
            <div className={`
                flex h-screen w-screen ${theme}
            `}>
                <SideMenu />
                <div className={`
                    flex flex-col w-full p-7 bg-gray-300
                    dark:bg-gray-800
                `}>
                    <Header
                        title={props.title}
                        subtitle={props.subtitle}
                    />
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </AuthRoute>
    )
}