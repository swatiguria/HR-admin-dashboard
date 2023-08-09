import "./chipComponentStyle.scss"
import { MuiChipsInput } from 'mui-chips-input'

export default function ChipComponent({ value, onChange }) {
    return (
        <>
            {
                value && <MuiChipsInput value={value} onChange={onChange} />
            }
        </>

    )
}

