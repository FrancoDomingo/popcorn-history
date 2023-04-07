import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {selectAllHistory, fetchHistory, deleteHistory} from '../features/history/historySlice'

import {Button, Card, CardContent, CardMedia, CardActions, Typography, Grid, Skeleton, Pagination} from '@mui/material'

export default function HistoryList() {
  const dispatch = useDispatch()
  const history = useSelector(selectAllHistory)
  const historyStatus = useSelector(state => state.history.status)

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = history.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(history.length / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

  const navigate = useNavigate()
  
  useEffect(() => {
    if(historyStatus === 'idle'){
      dispatch(fetchHistory())
    }
  }, [historyStatus, dispatch])

  const deleteEntry = async (id) =>{
    try {
        await fetch(`http://localhost:4000/history/${id}`, {
        method: 'DELETE'
      }).then(async response => {
        const data = await response.json()        
        dispatch(deleteHistory(data))
      })

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <>      
      <h1>History</h1>
      <Grid container spacing={2}>
      {        
        (historyStatus === 'loading' ? Array.from(new Array(9)) : currentRecords).map((currentRecords, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>  
            { 
              currentRecords ?               
              (<Card key={currentRecords.id} sx={{ marginBottom: ".7rem", maxWidth: 345, height: 700}}>
                <Link to={currentRecords.url} target="_blank" rel="noopener noreferrer">
                  <CardMedia
                    component="img"
                    alt={currentRecords.titulo_original}
                    height="500"
                    image={currentRecords.img}                  
                  />
                </Link>
                <CardContent style={{height: 110}}>
                  {/* TITULO */}
                  <Typography 
                    gutterBottom variant="h5" 
                    component="div" 
                    title={
                      currentRecords.titulo_original + (currentRecords.titulo_secundario ? ' | ' + currentRecords.titulo_secundario : '')
                    }>
                    {String(currentRecords.titulo_original).length > 27 ? String(currentRecords.titulo_original).slice(0, 27) + '...' : currentRecords.titulo_original}
                  </Typography>
  
                  {/* DESCRIPCION     */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    title={
                      String(currentRecords.descripcion).length > 200 ? currentRecords.descripcion : ''
                  }>
                    {String(currentRecords.descripcion).length > 200 ? String(currentRecords.descripcion).slice(0, 200) + '...' : currentRecords.descripcion}
                  </Typography>
                </CardContent>
  
                {/* BOTONES EDIT/DELETE */}
                <CardActions style={{marginTop: '.5rem'}}>
                  <Button variant='contained' 
                      color='inherit'                       
                      onClick={
                        () =>{navigate(`/history/${currentRecords.id}/edit`)}
                    }>
                      Edit
                    </Button>
  
                    <Button variant='contained' 
                      color='warning'
                      style={{marginLeft: '12rem'}}
                      onClick={
                        () =>{
                          if(window.confirm(`Eliminar ${currentRecords.titulo_original} del historial?`)){
                            deleteEntry(currentRecords.id)
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

      {/* PAGINATION */}
      <Grid container justifyContent="center">       
        <Pagination count={pageNumbers.length} variant="outlined" page={currentPage} color='primary' shape="rounded" onChange={handleChange}/>
      </Grid>
    </>    
  )     
}




