import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange }) {

const [isEdit, setIsEdit] = useState(false);
const [playerName, setPlayerName] = useState(initialName);

function handleClick(){
    setIsEdit(isEditing => !isEditing);
     if(isEdit){
        onNameChange(symbol, playerName)
    }
}

function handleChange(event){
    setPlayerName(event.target.value);
}

let editablePlayerName = <span className="player-name">{playerName}</span> ;
if(isEdit){
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
}

    return (
        <li className={isActive ? "active" : null}>
            <span className="player">
                {editablePlayerName} 
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEdit ? "Save" : "Edit"}</button>
        </li>
    );
}