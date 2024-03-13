import Carousel from "react-material-ui-carousel";
import { Paper } from '@mui/material';
// import { Paper, Button } from '@mui/material';
import cat1 from  "../../assets/1.PNG";
import cat2 from  "../../assets/3.PNG";
import cat3 from  "../../assets/2.PNG";

//npm install tw-elements

const Promotion = () => {

    return (
        <div style={{textAlign:"center", marginBottom:40}}>
        <Carousel>
            <Paper>
                <img src={ cat1 } alt="..."/>
            </Paper>
            <Paper>
                <img src={ cat2 } alt="..."/>
            </Paper>
            <Paper>
                <img src={ cat3 } alt="..."/>
            </Paper>
        </Carousel>
        </div>
    )
}
export default Promotion;