import { AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>
            <Link to="/"><LocalMoviesIcon fontSize='large' style={{color: "#eee", textDecoration:'none', paddingRight:'.5rem'}}/></Link>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              <Link to="/" style={{textDecoration:'none', color: "#eee"}}>Popcorn History</Link>
            </Typography>
            <Button variant='contained' color='primary' onClick={
                () => navigate("/history/new")
              }>New History</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
