
import loadingIcon from '../../../public/images/loading.gif'
import useAuth from "../../data/hook/useAuth"
import Head from 'next/head'
import Image from "next/image"
import router from 'next/router'

export default function AuthRoute(props){
    const { user, loading } = useAuth()

    function renderContent(){
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("sess_cookie"))
                                    window.location.href = "/autenticacao"
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading(){
        return (
            <div className={`flex justify-center items-center h-screen`}>
                <Image src={loadingIcon} alt="Icone de carregando" />
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    } else if(loading) {
        return renderLoading()
    } else {
        router.push('/autenticacao')
        return null
    }

}