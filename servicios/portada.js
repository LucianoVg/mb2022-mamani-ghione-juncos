import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { app } from "../firebase/config";

export async function traerImagen(nombre) {
    const storage = getStorage(app)
    const storageRef = ref(storage, 'portadas/' + nombre)
    return await getDownloadURL(storageRef)
}

export async function guardarImagen(nombre, archivo) {
    const storage = getStorage(app)
    const storageRef = ref(storage, 'portadas/' + nombre)
    return uploadBytes(storageRef, archivo)
}