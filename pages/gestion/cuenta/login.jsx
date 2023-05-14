import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import LoginLayout from "../../../components/loginLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Loading from "../../../components/loading";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { iniciarSesion, error, loading, authUser } = useAuth();
  const [ingresando, setIngresando] = useState(false);

  useEffect(() => {
    if (!loading && authUser) {
      router.push("/");
    }
  }, [loading, authUser]);

  const handleCorreo = (e) => {
    setCorreo(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    try {
      setIngresando(true);
      await iniciarSesion(correo, password);
      setIngresando(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginLayout>
      <Box component="form" onSubmit={onSubmitData} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Mail"
          name="correo"
          onChange={handleCorreo}
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          onChange={handlePassword}
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={ingresando}
          sx={{ mt: 3, mb: 2 }}
        >
          {ingresando && <Loading size={30} />}
          {!ingresando && <span>Ingresar</span>}
        </Button>
        <Grid container>
          <Grid item xs>
            <Typography
              onClick={() => {
                setMensaje("Consulte con el administrador del sistema");
                setTimeout(() => {
                  setMensaje("");
                }, 2000);
              }}
              sx={{ cursor: "pointer" }}
            >
              Olvidó sus credenciales?
            </Typography>
          </Grid>
        </Grid>
        {error !== "" && (
          <Alert sx={{ m: 2 }} severity="warning">
            {error}
          </Alert>
        )}
      </Box>
    </LoginLayout>
  );
};
export default Login;
