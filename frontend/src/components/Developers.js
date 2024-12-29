import React from 'react';
import { Grid, Box, Typography, Card, CardContent, CardMedia, Container } from '@mui/material';
import dev_image from '../Assets/images/dev_image.jpg';
import logo from "../Assets/images/logo512.png";
import guide_1 from '../Assets/images/guide_1.jpg';
import guide_2 from '../Assets/images/guide_2.jpg';
import guide_3 from '../Assets/images/guide_3.jpg';
import guide_4 from '../Assets/images/guide_4.jpg';
import guide_5 from '../Assets/images/guide_5.jpg';
import guide_6 from '../Assets/images/guide_6.jpg';
import dev1 from '../Assets/images/dev1.png';
import dev2 from '../Assets/images/dev2.png';
import './Developers.css';

function AboutUs() {

    const guide = [
        { name: "Dr. T. Senthil Kumar", role: "Principal Investigator",designation: "Associate Professor",Department: "Computer Science and Engineering Department", school: "Amrita School of Engineering",address:"Coimbatore-641112",link: "https://www.amrita.edu/faculty/s-rajendrakumar/",image: guide_1 },
        { name: "Dr. S. Rajendra Kumar", role: " Co-Principal investigator",Department:"Department of Chemical Engineering and Materials Science" ,school: "Amrita Vishwa Vidyapeetham",address:"Coimbatore-641112",image: guide_2 },
        { name: "Rajeev Ramakrishnan", role: " Junior Research Fellow",school: "Amrita Vishwa Vidyapeetham",address:"Coimbatore-641112",image: guide_3 },
        { name: "Dr. Udhay Kumar", role: "Co-Principal Investigator",school: "Amrita Vishwa Vidyapeetham",address:"Coimbatore-641112", image: guide_4 },
        { name: "P.Gunanithi", role: "Project Assistannt",school: "Amrita Vishwa Vidyapeetham",address:"Coimbatore-641112", image: guide_5 },
        { name: "Dr. P. Subramaniam", role: "Mentor",school: "Amrita Vishwa Vidyapeetham", address:"Coimbatore-641112",image: guide_6 },
        
    ];

    const dev = [
        { name: "N MAHESH", role: "Developer", roll: "CB.SC.P2CSE24015", image: dev1 },
        { name: "N SAI GOPI", role: "Developer", roll: "CB.SC.P2CSE24015", image: dev2 },
    ]

  return (
    <div>
    <Box
        sx={{
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        }}>

        <Box
      sx={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 1, // Ensure it appears above the image
      }}
    >
  {/* Image */}            
  <a href="/home">
        <img
          src={logo}
          alt="Company Logo"
          style={{
            height: '60px',
            width: '60px',
            objectFit: 'contain',
          }}
          className="logo"
        />
      </a>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/home"
        sx={{
          fontFamily: 'cursive',
          fontWeight: 900,
          letterSpacing: '.3rem',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        OotyOrigins
      </Typography>
    </Box>
   
        <img src={dev_image} alt="About Us" height={550} width='100%' style={{ objectFit: 'cover' }} />
        
  {/* Text content */}
            <Box sx={{ position: 'absolute', color: 'gold', textAlign: 'center' }}>
                <Typography variant="h5" color='gold'>About Us</Typography>
                <Typography variant="h1" color='white' sx={{ marginTop: '2px' }}>
                We work for the Tribal Community
                </Typography>
            </Box>
    </Box>
        
     

      {/* About the Products */}
      <Container sx={{ padding: '50px 0' }}>
        <Box
          sx={{
            background: 'rgba(0, 0, 0, 0.1)',
            padding: '30px',
            marginTop: '100px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" color='red'  align="center" gutterBottom>
            <b>Our Main Goal</b>
          </Typography>
          <Typography variant="h6" align="center">
          "Ooty Origins" is an ecommerce platform that empowers the tribal communities of Ooty, India, by connecting them 
          <Typography variant="h6" align="center">
          directly with customers and tourists. The platform showcases their unique, handcrafted products, preserving the rich </Typography>
          <Typography variant="h6" align="center">
          cultural heritage of Ooty. By eliminating intermediaries, artisans can receive fair returns, ensuring sustainable income </Typography>
          <Typography variant="h6" align="center">
          and growth. Through "Ooty Origins," customers experience authentic craftsmanship while supporting the livelihoods of</Typography>
          <Typography variant="h6" align="center">
          local artisans. This initiative bridges the gap between tradition and modern commerce, offering a meaningful market</Typography>
          <Typography variant="h6" align="center">
          place for Ooty's tribal communities.We offer a range of handmade, culturally significant products crafted by the tribal</Typography>
          <Typography variant="h6" align="center">
          crafted by the tribal communities in Ooty. These unique pieces showcase the rich heritage of the region.</Typography>
          </Typography>
        </Box>
      </Container>


     {/* Guide Section */}
   
     <Container sx={{padding: '1px 0'}}>  
      <h1 className = 'guide' style={{ textAlign: 'left' }}> Meet Our Guides</h1>
           <hr className="solid" />
        </Container>
        <Container 
      sx={{ 
        padding: '30px 0',
        color: 'white',
        marginTop: '40px',
        borderRadius: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Grid container spacing={4} justifyContent='center' display= 'flex' flexDirection= 'row'>
        {guide.map((guide, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="our-team">
                <div className="picture">
                  <img
                    src={guide.image}
                    alt={`${guide.name}'s photo`}
                    className="img-fluid"
                  />
                </div>
                <h1 className="title">{guide.name}</h1>
                <p className="role">{guide.role}</p>
                <p className="role">{guide.designation}</p>
                <p className="role">{guide.Department}</p>
                <p className="role">{guide.school}</p>
                <p className="role">{guide.address}</p>
                <ul className="social">
                  <li>
              
              {/* guide link  */}
                  </li>
                </ul>
              </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      
    
    

      {/* Developer Section */}
      <Container 
      sx={{ 
        padding: '50px 0',
        color: 'white',
        marginTop: '100px',
        borderRadius: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h4" color="red" align="center" gutterBottom>
        <b>Meet Our Developers</b>
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {dev.map((developer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div className="profile-container">
              <div className="profile-wrapper">
                <div className="profile-card">
                  <img src={developer.image} alt={`${developer.name}`} />
                  <h2>{developer.name}</h2>
                  <h4>Role: {developer.role}</h4>
                  <p>Roll No: {developer.roll}</p>
                  <p><h3>Amrita School Of Engineering</h3></p>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>

    </div>
  );
}

export default AboutUs;
