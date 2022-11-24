import style from '../styles/loading.module.css';

export default function Loading({ size = 100 }) {
    return (
        <span className={style.loader} style={{ width: size }}></span>
    )
}