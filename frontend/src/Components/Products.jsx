import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import EventCard from "./ProductsData";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Card,
  CardMedia,
} from "@mui/material";
import SelectEvent from "./AddtoCart";


const Products = () => {
  // States to map
  const [events, setEvents] = useState([]);

  //State to select(dialog box) the seperete event
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  //State for the loading
  const [loading, setLoading] = useState(true);

  // Fetching the event-list
  let fetchEvents = async () => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/get-prod`;
    try {
      const response = await axios.get(apiUrl);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  // Open and close the dilog box
  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  // Loading condition
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={6} lg={12} key={event._id}>
            <EventCard event={event} onClick={() => handleClickOpen(event)} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedEvent?.name}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              p: 2,
            }}
          >
            <Box sx={{textAlign: "center" }}>
              <Card sx={{ maxWidth: 400, margin: "0 auto", mb: 2 }}>
                <CardMedia
                  component="img"
                  image={selectedEvent?.images}
                  alt="Event"
                  sx={{ height: 300, width: "100%" }}
                />
              </Card>

              <Box>
                {selectedEvent && (
                  <>
                    <Typography
                      variant="body1"
                      gutterBottom
                    >
                      <strong>Description:</strong> {selectedEvent.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                    >
                      <strong>Price:</strong> ₹ {selectedEvent.price}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Box mt={3}>
                <SelectEvent event={selectedEvent} />
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;
