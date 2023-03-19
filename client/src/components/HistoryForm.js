import {Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from '@mui/material'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'

export default function HistoryForm() {
  const [history, setHistory] = useState({
    title: '', 
    altTitle: '', 
    hType: '', 
    img: '',  
    date: new Date().toDateString(),
    description: '',
    url: ''
  })

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if(editing){
      await fetch(`http://localhost:4000/history/${params.id}/edit`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(history)
      })
    } else {
      const response = await fetch('http://localhost:4000/history', {
      method: 'POST',
      body: JSON.stringify(history),
      headers: {"Content-Type": "application/json"}
      })   
      const data = await response.json()
      console.log(data)
    }

    setLoading(false)
    navigate('/')
  }

  const handleChange = (e) => {
    setHistory({...history, [e.target.name]: e.target.value})
  }

  const loadHistory = async (id) => {
    const resp = await fetch(`http://localhost:4000/history/${id}`)
    const data = await resp.json()

    setHistory({
      title: data[0].titulo_original, 
      altTitle: data[0].titulo_secundario,
      hType: data[0].history_type,
      img: data[0].img,
      date: new Date().toDateString(),
      description: data[0].descripcion,
      url: data[0].url
    })

    setEditing(true)
  }

  useEffect(() => {
    if(params.id){
      loadHistory(params.id)
    }
  }, [params.id])

  return (
    <Grid container alignItems='center' justifyContent='center' direction='column'>
      <Grid item xs={8} style={{width: 500}}>
        <Card sx={{mt: 5}} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant='5' textAlign='center' color='white'>
            {editing ? 'Actualizar historial' : 'Agregar nuevo historial'}
          </Typography>

          <CardContent>
            <form onSubmit={handleSubmit}> 

              {/* CAMPOS DEL FORMULARIO */}
              <TextField 
                variant='filled' 
                label='Titulo Original' 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }}
                
                name='title'
                value={history.title || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />
              
              <TextField 
                variant='filled' 
                label='Titulo Secundario' 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }} 
                
                name='altTitle'
                value={history.altTitle || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />

              <TextField 
                variant='filled' 
                label='Tipo de historial [1: peliculas, 2:series]' 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }} 
                
                name='hType'
                value={history.hType || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />  

              <TextField 
                variant='filled' 
                label='IMG Url' 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }} 
                
                name='img'
                value={history.img || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />

              <TextField 
                variant='filled' 
                label='Fecha' 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }} 
                
                name='date'
                value={history.date || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />

              <TextField 
                variant='filled' 
                label='Descripcion'                 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }} 
                
                name='description'
                value={history.description || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
                multiline
                rows={6}
              />

              <TextField 
                variant='filled' 
                label='URL [IMDB / Fandom / Etc]'                 
                sx={{
                  display: 'block', 
                  margin: '.5rem 0',
                  width: 400,
                  "& .MuiInputBase-root": {
                      width: 400
                    }
                  }} 
                
                name='url'
                value={history.url || ''}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />
              {/* FIN CAMPOS DEL FORMULARIO */}

              <Button 
                variant='contained' 
                color='primary' 
                type='submit' 
                disabled={!(history.title && history.hType)}>
                  {loading ? <CircularProgress color='inherit' size={24} /> : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
