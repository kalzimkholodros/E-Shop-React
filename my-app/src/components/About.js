import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <Typography variant="h2" className="about-title">
          Hakkımızda
        </Typography>
      </div>
      
      <Container maxWidth="lg">
        <Grid container spacing={4} className="about-content">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="about-paper">
              <Typography variant="h5" className="section-title">
                Biz Kimiz?
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="about-paper">
              <Typography variant="h5" className="section-title">
                Misyonumuz
              </Typography>
              <Typography paragraph>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} className="about-paper">
              <Typography variant="h5" className="section-title">
                Değerlerimiz
              </Typography>
              <Typography paragraph>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About; 