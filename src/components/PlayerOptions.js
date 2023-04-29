import { Select } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
 
const PlayerOptions = (props) => {
    const [select, setSelected]  = useState('');
    const [optionList,setOptionList] = useState([]);
    const fetchData = () => {
        fetch(`/api/player/all`)
          .then((res) => res.json())
          .then((data) => {
            setOptionList(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(() => {
        fetchData();
      }, []);
    return (
        <Select
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}
        >
            <option key="all" value="all">All</option>
            {optionList.map((item) => (
            <option key={item.id} value={item.name}>
                {item.name}
            </option>
            ))}
        </Select>
    );
}

export default PlayerOptions;