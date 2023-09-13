import { capitalize } from "@mui/material";
import "../../src/CSS.css"

const Header = ({name}) => {



 return (<div className="Header" >
<h1 style={{display: "inline"}}>Hi </h1> <h1 style={{
        color: "pink",
        fontWeight: "bolder",
        display: "inline",
        textTransform: "uppercase"
      }} > { name}  </h1>  <h1 style={{display: "inline"}}> !   Welcome to Sara's Quizz</h1>
</div>);

};

export default Header;