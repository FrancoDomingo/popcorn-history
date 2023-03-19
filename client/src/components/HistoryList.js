import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Card, CardContent, CardMedia, CardActions, Typography, Grid, Skeleton, Stack, Pagination} from '@mui/material'

export default function HistoryList() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialHistory, setInitialHistory] = useState()
  const navigate = useNavigate()
  
  const loadHistory = async () => {
    setLoading(true)

    const response = await fetch('http://localhost:4000/history/')
    const data = await response.json()
    
    setInitialHistory(data.length)
    setHistory(data)
    setLoading(false)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const deleteHistory = async (id) =>{
    try {
        await fetch(`http://localhost:4000/history/${id}`, {
        method: 'DELETE'
      })
      setHistory(history.filter(history => history.id !== id))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>      
      <h1>History</h1>
      <Grid container spacing={2}>
      {        
        (loading ? Array.from(new Array(12)) : history).map((history, index) => (
          <Grid item xs={4} key={index}>  
            { 
              history ?               
              (<Card key={history.id} sx={{ marginBottom: ".7rem", maxWidth: 345, height: 700}}>
                <CardMedia
                  component="img"
                  alt={history.titulo_original}
                  height="500"
                  image={history.img} 
                />
                <CardContent style={{height: 110}}>
                  {/* TITULO */}
                  <Typography 
                    gutterBottom variant="h5" 
                    component="div" 
                    title={
                      history.titulo_original + (history.titulo_secundario ? ' | ' + history.titulo_secundario : '')
                    }>
                    {String(history.titulo_original).length > 27 ? String(history.titulo_original).slice(0, 27) + '...' : history.titulo_original}
                  </Typography>

                  {/* DESCRIPCION     */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    title={
                      String(history.descripcion).length > 200 ? history.descripcion : ''
                  }>
                    {String(history.descripcion).length > 200 ? String(history.descripcion).slice(0, 200) + '...' : history.descripcion}
                  </Typography>
                </CardContent>

                {/* BOTONES EDIT/DELETE */}
                <CardActions style={{marginTop: '.5rem'}}>
                  <Button variant='contained' 
                      color='inherit'                       
                      onClick={
                        () =>{navigate(`/history/${history.id}/edit`)}
                    }>
                      Edit
                    </Button>

                    <Button variant='contained' 
                      color='warning'
                      style={{marginLeft: '12rem'}}
                      onClick={
                        () =>{
                          if(window.confirm(`Eliminar ${history.titulo_original} del historial?`)){
                            deleteHistory(history.id)
                          }                        
                        }
                    }>
                      Delete
                    </Button>
                </CardActions>
              </Card>)
              : <Skeleton variant="rectangular" width={345} height={700} />
            }               
          </Grid>
        ))
      }  
      </Grid>   
      {console.log(history)}
      {console.log(history[0])}
      {/* PAGINATION */}
      <Grid container justifyContent="center">
        <Stack spacing={2}>
          <Pagination 
            count={
              initialHistory > 9 ? (Number.isInteger(initialHistory / 9) ? initialHistory / 9 : parseInt((initialHistory / 9) + 1) ) : 1
            } 
            page={1} 
            variant="text" 
            color="primary"/>          
        </Stack>
      </Grid>
    </>    
  )   
}
