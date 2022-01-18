import { InputTypes } from '../../types/InputTypes'

interface AuthInputProps {
    label: string
    value: any
    type?: InputTypes
    required?: boolean
    onChangeValue?: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps){
    return (
        <div className={`
            flex flex-col mt-4
        `}>
            <label>{props.label}</label>
            <input
                type={props.type ?? 'text'}
                value={props.value}
                onChange={e => props.onChangeValue?.(e.target.value)}
                required={props.required}
                className={`
                    px-4 py-3 border-2 rounded-lg mt-2
                    border focus:border-blue-500
                    focus:outline-none
                    bg-gray-200 focus:bg-white
                `}
            />
        </div>
    )
}