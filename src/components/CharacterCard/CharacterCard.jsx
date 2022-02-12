import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'

import PropTypes from 'prop-types'

const CharacterCard = ({ imgSrc, name, species, gender, locationName }) => {
  return (
    <Card sx={{ width: 250, height: 450 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ objectFit: 'contain', height: 250 }}
          image={imgSrc}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <List dense={true}>
            <ListItem disableGutters>
              <EmojiNatureIcon sx={{ marginRight: 1 }} />
              <ListItemText primary={species} />
            </ListItem>
            <ListItem disableGutters>
              {gender === 'male' ? (
                <MaleIcon sx={{ marginRight: 1 }} />
              ) : (
                <FemaleIcon sx={{ marginRight: 1 }} />
              )}
              <ListItemText primary={gender} />
            </ListItem>
            <ListItem disableGutters>
              <TravelExploreIcon sx={{ marginRight: 1 }} />
              <ListItemText primary={locationName} />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

CharacterCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
}

export { CharacterCard }
