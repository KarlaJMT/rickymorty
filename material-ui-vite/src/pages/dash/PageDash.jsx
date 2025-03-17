import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'


export const PageDash = () => {
  return (
    <div>PageDash
        <br />
        <Link to='/dash/23'>Click para ver más detalles de México</Link> <br />
        <Link to='/dash/43'>Click para ver más detalles de USA</Link> <br />
        <Link to='/dash/32'>Click para ver más detalles de Honduras</Link> <br />
        <Button LinkComponent={Link} to='/dash/45' variant="contained" color="success">
            Ver más detalles de Irak
        </Button>
    </div>
    
  )
}