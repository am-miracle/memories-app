import { makeStyles } from "@mui/styles";
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: '30px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
  },
  heading: {
    color: '#36393B',
    textDecoration: 'none',
    fontFamily: 'Climate Crisis',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    // justifyContent: 'flex-end',
    // width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    width: ' 100%',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));