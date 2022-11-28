import { CircularProgress } from "@mui/material";

export default function Loading({ size = 100 }) {
    return (
        <CircularProgress sx={{ margin: 'auto' }} size={size} color="info" />
    )
}