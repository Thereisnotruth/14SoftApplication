import { Grid, Icon } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'
import { Link } from 'react-router-dom'
import './components.css'

const Footer = () => {
  return (
    <Grid container className='footer' spacing={1}>
      <Grid item className='home_button' xs={4}>
        <Link to={'/main'}>
          <HomeIcon fontSize='large' color='black'/>
        </Link>
      </Grid>
      <Grid item className='search_button' xs={4}>
        <Link to={'/search'}>
          <SearchIcon fontSize='large' />
        </Link>
      </Grid>
      <Grid item className='user_button' xs={4}>
        <Link to={'/user'}>
          <PersonIcon fontSize='large' />
        </Link>
      </Grid>
    </Grid>
  );
}

export default Footer