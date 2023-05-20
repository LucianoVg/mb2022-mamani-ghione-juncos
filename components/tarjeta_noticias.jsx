import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";
import {
  Card,
  CardContent,
  Box,
  CardActions,
  Button,
  Typography,
  IconButton,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
  const { authUser } = useAuth();
  const router = useRouter();

  return (
    <Box xs={3}>
      <Card
        // className={`${styles.card}`}
        sx={{
          width: "280px",
          height: "460px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          marginBottom: "10mm",
          marginTop: "10mm",
          marginLeft: "10mm",
          borderRadius: "30px",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            className={` ${styles.overflow}`}
          // sx={{
          //   height: "50%",
          //   overflow: "hidden",
          // }}
          >
            <CardMedia
              // className={`${styles.card_img_top}`}
              sx={{
                height: "18rem",
                width: "21rem",
                transform: "scale(1)",
                transition: "all 0.2s ease-in-out",
                transform: "scale(1)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.8)"
                }
              }}

              component="img"
              image={url}
              alt="imagen"
            />
            {authUser &&
              (authUser?.rol?.tipo === "Director" ||
                authUser?.rol?.tipo === "Administrador" ||
                authUser?.rol?.tipo === "Preceptor") && (
                <a
                  href={`/gestion/noticias/${id}`}
                  style={{ position: "absolute", left: 225, bottom: 235 }}
                >
                  <IconButton>
                    <Edit style={{ color: "black", fontSize: "27px" }} />
                  </IconButton>
                </a>
              )}
          </div>
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <strong> {titulo}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${descripcion.substring(0, 50)}...`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            // className="button-61"
            onClick={() => router.push(`/gestion/noticias/detalles/${id}`)}
            size="small"
            sx={{
              marginLeft: "10px",
              alignItems: "center",
              appearance: "none",
              borderRadius: "14px",
              borderStyle: "none",
              boxShadow: "rgba(0, 0, 0, .2) 0 3px 1px -2px, rgba(0, 0, 0, .14) 0 2px 2px 0, rgba(0, 0, 0, .12) 0 1px 5px 0",
              boxSizing: " border-box",
              color: "#212121",
              cursor: "pointer",
              display: "inline-flex",
              fontFamily: "Roboto",
              fontSize: ".875rem",
              fontWeight: "500",
              height: "36px",
              justifyContent: "center",
            
              lineHeight: "normal",
              minWidth: "64px",
              outline: "none",
              overflow: "visible",
              padding: "0 16px",
              position: "relative",
              textAligntalign: "center",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "box-shadow 280ms cubic-bezier(.4, 0, .2, 1)",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "manipulation",
              verticalAlign: "middle",
              willChange: "transform, opacity",
              ":hover": {
                boxShadow: "rgba(0, 0, 0, .2) 0 2px 4px -1px, rgba(0, 0, 0, .14) 0 4px 5px 0, rgba(0, 0, 0, .12) 0 1px 10px 0"
              },
              ":focus": {
                boxShadow: "rgba(0, 0, 0, .2) 0 2px 4px -1px, rgba(0, 0, 0, .14) 0 4px 5px 0, rgba(0, 0, 0, .12) 0 1px 10px 0"
              },
              ":active": {
                boxShadow: "rgba(0, 0, 0, .2) 0 5px 5px -3px, rgba(0, 0, 0, .14) 0 8px 10px 1px, rgba(0, 0, 0, .12) 0 3px 14px 2px",
                background: "#ffffff"
              },
              ":not(:disabled)":{
                backgroundColor: "#338bff",
              },
            }}
          >
            Mas info.
          </Button>
        </CardActions>
      </Card>
    </Box >
  );
};

export default TarjetaNovedades;
