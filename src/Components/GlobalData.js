import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));
const useStylesTypography = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
  });

export default function GloablData() {
  const classes = useStyles();
  const classTypography = useStylesTypography();

  const [globalData, setGlobalData] = useState();
  const [dataLoading, setDataLoading] = useState(false)


  useEffect( () => {
    async function fetchGlobalData () {
      setDataLoading (true);
      const apiResponse = await fetch('https://covid19.mathdro.id/api');
      console.log(apiResponse);
      const DataFromAPI = await apiResponse.json();
      console.log(DataFromAPI);
      setGlobalData(DataFromAPI);
      setDataLoading (false);
    }
    fetchGlobalData();
  },[]);

     const loading = "loading";

  if(dataLoading) {
    return (
      <div className={classes.root}>
                <Paper elevation={3}>
                <div className={classTypography.root}>
                  <Typography variant="h4" gutterBottom style={{color: 'Black'}}>
                  {loading}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom style={{color: 'Black', fontWeight:'bold'}}>
                    Global Data as of today
                  </Typography>
                  </div>
                </Paper>
  
                <Paper elevation={3}>
                <div className={classTypography.root}>
                  <Typography variant="h4" gutterBottom style={{color:'Orange'}}>
                  {loading - 61410226 - 2409902 // Subtracting fatalities and recovered from active cases
                  }
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom style={{color:'Orange'}}>
                    Active
                  </Typography>
                  </div>
                </Paper>
  
                <Paper elevation={3}>
                <div className={classTypography.root}>
                  <Typography variant="h4" gutterBottom style={{color:'Green'}}>
                  {loading}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom style={{color:'Green'}}>
                    Recovered
                  </Typography>
                  </div>
                </Paper>
  
                <Paper elevation={3}>
                <div className={classTypography.root}>
                  <Typography variant="h4" gutterBottom style={{color:'Red'}}>
                  {loading}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom style={{color:'Red'}}>
                    Fatalities
                  </Typography>
                  </div>
                </Paper>
      </div>
    )
  }

  return (
    <div className={classes.root}>
              <Paper elevation={3}>
              <div className={classTypography.root}>
                <Typography variant="h4" gutterBottom style={{color: 'Black'}}>
                <NumberFormat value={globalData && globalData.confirmed && globalData.confirmed.value} displayType={'text'} thousandSeparator={true} />
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{color: 'Black', fontWeight:'bold'}}>
                  Global Data as of today
                </Typography>
                </div>
              </Paper>

              <Paper elevation={3}>
              <div className={classTypography.root}>
                <Typography variant="h4" gutterBottom style={{color:'Orange'}}>
                <NumberFormat value={globalData && globalData.confirmed && globalData.confirmed.value} displayType={'text'} thousandSeparator={true}/>
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{color:'Orange'}}>
                  Active
                </Typography>
                </div>
              </Paper>

              <Paper elevation={3}>
              <div className={classTypography.root}>
                <Typography variant="h4" gutterBottom style={{color:'Green'}}>
                <NumberFormat value={globalData && globalData.recovered && globalData.recovered.value} displayType={'text'} thousandSeparator={true}/>
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{color:'Green'}}>
                  Recovered
                </Typography>
                </div>
              </Paper>

              <Paper elevation={3}>
              <div className={classTypography.root}>
                <Typography variant="h4" gutterBottom style={{color:'Red'}}>
                <NumberFormat value={globalData && globalData.deaths && globalData.deaths.value} displayType={'text'} thousandSeparator={true}/>
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{color:'Red'}}>
                  Fatalities
                </Typography>
                </div>
              </Paper>
    </div>
  );
}