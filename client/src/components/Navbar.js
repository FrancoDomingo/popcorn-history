import {useState} from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography, Autocomplete, TextField} from '@mui/material'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {selectAllHistory, searchInHistory} from '../features/history/historySlice'

export default function Navbar() {
  const navigate = useNavigate()  
  const history = useSelector(selectAllHistory) 
  const [open, setOpen] = useState(false);
  const [searchItemId, setItemId] = useState('')
  const dispatch = useDispatch()


  const handleSubmit = async () => {
    if(searchItemId){
      dispatch(searchInHistory(searchItemId))
    }    
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Link to="/"><LocalMoviesIcon fontSize='large' style={{color: "#eee", textDecoration:'none', paddingRight:'.5rem'}}/></Link>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
            >
              <Link to="/" style={{textDecoration:'none', color: "#eee",}}>Popcorn History</Link>
            </Typography>

            <Autocomplete     
              open={open}
              onInputChange={(_, value) => {
                if (value.length === 0 || value === ' ') {
                  if (open) setOpen(false);
                } else {
                  if (!open) setOpen(true);
                }
              }}
              onClose={() =>setOpen(false)}

              onChange={(event, newValue) => {
                if(newValue){
                  setItemId(newValue);   
                }else
                {
                  setItemId(newValue)
                  dispatch(searchInHistory(newValue))
                }                    
              }}   
                
              disablePortal
              id="combo-box-demo"
              options={history}
              getOptionLabel={option => option.titulo_secundario ? option.titulo_original + ' | ' + option.titulo_secundario : option.titulo_original}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search"/>}  
            />

            <Button 
              variant='contained' 
              color='warning' 
              style={{marginLeft: '1rem'}}
              onClick={
                () => {
                  searchItemId ? handleSubmit() : navigate("/history/new")
                }
              }>{searchItemId ? 'Search' : 'New History'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
