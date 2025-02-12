import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const ProductsData = ({event, onClick}) => {
  return (
    <Card sx={{ maxWidth: 550, margin: "3rem",width:"17vw" }}>
      <CardMedia
        component="img"
        height="200"
        image={event.images}
        alt={event.name}
      />
      <CardContent>
      <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            height: '3rem',
            lineHeight: '1.5rem',
          }}
        >
          {event.name}
        </Typography>
        <Typography variant="body2" color="textPrimary">
         {event.description}
        </Typography>
        <Typography variant="body2" color="textPrimary">
        ₹ {event.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Select
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductsData;
