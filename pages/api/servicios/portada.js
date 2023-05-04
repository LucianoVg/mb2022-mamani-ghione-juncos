import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase.config";

export async function guardarImagen(nombre, archivo) {
  const storage = getStorage(app);
  const storageRef = ref(storage, nombre);
  const res = await uploadBytes(storageRef, archivo);
  return await getDownloadURL(res.ref);
}
