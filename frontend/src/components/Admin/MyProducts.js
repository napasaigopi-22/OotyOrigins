import { Card, CardMedia, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export default function MyProducts(props) {
    return (<>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                <Typography variant="h5" >{props.name}</Typography>
                <img
                    src={'http://localhost:4000/images/' + props.src}
                    title={props.name}
                    height={'120px'}
                />
                <Typography variant="h5" >X{props.stock}</Typography>
            </Card>
    </>)
}