import { Container, Typography, Box } from '@mui/material';


const BookingConfirmation = () => {

  
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h2" align="center">
          Thanks for booking the event,<br/>
          Notification will be sent to the registered email 🎉🎉
        </Typography>
      </Box>
    </Container>
  );
};

export default BookingConfirmation;
