import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';







export default function Product(props) {
    return (
        <Box sx={{ width: '100%' }}>
            <Card>
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{props.name}</Typography>
                        <CardMedia
                            component="img"
                            height="194"
                            image={props.img}
                            alt="Product Image"
                        />
                    </CardContent>
                    <CardContent>
                        <p style={{textAlign:'right'}}><b>Rs: </b>{props.cost}/-</p>
                    </CardContent>
                    <CardActions>
                        <Button startIcon={<ShoppingCartIcon />} sx={{width: '45%', margin:'auto'}} variant="contained" color="success" size="large">Buy</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}


// function Product(props)
// {
//     return (
//         <>
//             <div>
//                 <p>{props.name}</p>
//             </div>
//         </>
//     )

// }

// export default Product;