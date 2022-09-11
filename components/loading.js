import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <CircularProgress sx={{ margin: 'auto' }} size={100} color="secondary" />
    )
}