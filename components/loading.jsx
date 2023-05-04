import { LinearProgress } from "@mui/material";

export default function Loading({ size = 100 }) {
  return (
    <LinearProgress sx={{ margin: "auto", my: 2 }} size={size} color="info" />
  );
}
