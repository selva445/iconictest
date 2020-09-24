import React ,{useState,useEffect,Suspense} from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from "react-router-dom";
import './Home.css'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box'

export default function Home() {

 

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const defaultProps = {
        bgcolor: 'background.paper',
        m: 1,
        style: { width: '5rem', height: '5rem' },
        borderColor: 'text.primary',
      };

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          margin: 'auto',
          maxWidth: 500,
        },
        image: {
          width: 128,
          height: 128,
        },
        img: {
          margin: 'auto',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }));
    const classes = useStyles();
    useEffect(() => {

        axios.get("https://eve.theiconic.com.au/catalog/products?gender=female&page=1&page_size=10&sort=popularity")
        
        .then(res=> {

            setProducts(res.data._embedded.product)         
        
            setLoading(false)
           
        })
        
        .catch(err=>{
            setError(true)
            console.log(err)
        })

    }, [])

    const setSearchtext = e=> {
      
        setSearch(e.target.value)
        console.log(search)

    }

   const filtereddata=products.filter ( product=>{

        return product.name.toLowerCase().includes(search.toLowerCase())

   })
    return (
       
        <div >
          <Header />      
            <div > 
            <Typography gutterBottom variant="subtitle3">
             Search Product
            </Typography>
            <input style={{ width: 300 }} type="text" name="search" placeHolder=" Type something to Search [Ex:Sandal,Dress]" onChange={setSearchtext}/>
            
            
                { filtereddata.map( eachprod => {

                    return (

                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                       
                                <Grid container spacing={2}>
                                  
                                        <Grid item>
                                            <ButtonBase className={classes.image}>
                                            <Link to ="/product/:id"> 
                                            <img className={classes.img} alt="complex" src={eachprod._embedded.images[0].url} />
                                            </Link>
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                {eachprod.name}
                                                </Typography>
                                            
                                                <Typography variant="body2" color="textSecondary">
                                                {eachprod.sku}
                                                </Typography>

                                                <Typography variant="body2" color="textPrimary">
                                                CATEGORY -  {eachprod._embedded.gender.name}
                                                </Typography>


                                            </Grid>
                                            <Grid item>
                                                <FavoriteIcon color="secondary"> 
                                                </FavoriteIcon>
                                            

                                            <div> 
                                                <Button variant="contained" color="secondary">
                                                    ADD TO CART
                                                </Button>
                                                </div>
                                            </Grid>
                                            </Grid>
                                            <Grid item>
                                            <Typography variant="subtitle1">AUD $ {eachprod.final_price}</Typography>
                                            </Grid>
                                        </Grid>
                                
                                </Grid>
                 
                            </Paper>
                        </div>

                    )
                })}
            
            </div>
          <Footer />
        </div>
 
    )
}
