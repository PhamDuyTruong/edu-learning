import React, {useState} from 'react';

import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";




const DataManage = ({ items, type }) => {
  const [display, setDisplay] = useState(true);

  const handleDelete = () =>{
      setDisplay(false);
  }

  if(display){
   return (
      <Chip 
         icon = {<FaceIcon/>}
        label={`${items} ${type} was found!`}
        clickable
        color="default"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      >
      </Chip>
    )
  }
  else{
      return null;
  }
}

export default DataManage