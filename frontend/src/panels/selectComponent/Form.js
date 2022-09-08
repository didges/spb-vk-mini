import React, { useState } from 'react';
import Select from 'react-select';

export default function Form(props) {


    const [selectedOption, setSelectedOption] = useState(props.data["answers"][0]);

    return (
        <div className="Form">
            {props.data['question']}
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={props.data["answers"]}
            />
        </div>
    );
}