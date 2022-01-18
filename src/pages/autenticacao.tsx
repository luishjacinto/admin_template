/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react'
import AuthInput from "../components/auth/AuthInput";
import { AuthScreenMode } from '../types/AuthScreenMode'
import {
    IconGoogle,
    IconWarning
} from '../components/icons';
import useAuth from '../data/hook/useAuth';

export default function Autenticacao() {

    const {
        signUp,
        signIn,
        signInGoogle
    } = useAuth()

    const [mode, setMode] = useState<AuthScreenMode>('signIn')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    function showError(msg, time = 5) {
        setError(msg)
        setTimeout(() => setError(null), time * 1000)
    }

    async function submit(){
        try{
            if (mode === 'signIn') {
                await signIn(email, password)
            } else {
                await signUp(email, password)
            }
        } catch (e) {
            showError(e?.message ?? `Ocorreu um erro ao tentar ${mode === 'signIn' ? 'entrar' : 'cadastrar-se'}.`)
        }
    }

    return (
        <div className='flex h-screen items-center justify-center'>
            <div className={`
                hidden md:block md:w-1/2 lg:w-2/3
            `}>
                <img
                    src="https://source.unsplash.com/random"
                    alt="Imagem da tela de autenticação"
                    className={`
                        h-screen w-screen object-cover
                    `}
                />
            </div>
            <div className='m-10 w-full md:w-1/2 lg:w-1/3'>
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>
                    {mode === 'signIn' ? 'Entre com o seu E-mail e Senha' : 'Cadastre-se na nossa Plataforma'}
                </h1>

                {error && (
                    <div className={`
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg
                        flex items-center
                    `}>
                        {IconWarning()}
                        <span className='ml-3'>
                            {error}
                        </span>
                    </div>)
                }

                <AuthInput
                    label="E-mail"
                    value={email}
                    onChangeValue={setEmail}
                    type="email"
                    required
                />
                <AuthInput
                    label="Senha"
                    value={password}
                    onChangeValue={setPassword}
                    type="password"
                    required
                />

                <button onClick={submit} className={`
                    w-full bg-indigo-500 bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {mode === 'signIn' ? 'Entrar' : 'Cadastrar-se'}
                </button>

                <hr className="my-6 border-gray-300 w-full"/>

                <button onClick={signInGoogle} className={`
                    bg-gray-100 hover:bg-blue-300
                    text-gray-900 hover:text-white
                    rounded-lg px-4 py-3 mt-6
                    w-full flex items-center justify-center
                `}>
                    {IconGoogle}<span className='ml-2'>Entrar com Google</span>
                </button>

                {mode === 'signIn' ? (
                    <p className='mt-8'>
                        Não possui cadastro?
                        <a onClick={() => setMode('signUp')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Criar uma conta</a>
                    </p>
                ) : (
                    <p className='mt-8'>
                        Já possui cadastro?
                        <a onClick={() => setMode('signIn')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Entrar</a>
                    </p>
                )}
            </div>
        </div>
	)
}
