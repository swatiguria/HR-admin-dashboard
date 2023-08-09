import React from "react";
import './styles.scss'
import { formatDate } from "../../utils/formatDate";

export default function DatePickerComponent({ onChange, value }) {

    return (
        <>
            <div className="w-full">
                <input
                    type="date"
                    className="w-full datePickerId bg-transparent p-2"
                    onChange={(e) => { onChange(e.target.value) }}
                    value={value}
                    id="datePickerId"
                />
            </div>
        </>
    )

}