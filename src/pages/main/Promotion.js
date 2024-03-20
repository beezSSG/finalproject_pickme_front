import Carousel from "react-material-ui-carousel";
import { Paper } from '@mui/material';
// import { Paper, Button } from '@mui/material';
import cat1 from  "../../assets/imgs/main/1.PNG";
import cat2 from  "../../assets/imgs/main/2.PNG";
import cat3 from  "../../assets/imgs/main/3.PNG";



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