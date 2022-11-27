import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Pagination.module.css';

export default function Pagination({ onNextPage, onPrevPage }) {
    return (
        <div className={styles.paginationContent}>
            <ul className={styles.paginationItems}>
                <li onClick={onPrevPage} className={styles.paginationItem}>
                    <FontAwesomeIcon
                        size='2x'
                        icon={faArrowLeft} />
                </li>
                <li onClick={onNextPage} className={styles.paginationItem}>
                    <FontAwesomeIcon
                        size='2x'
                        icon={faArrowRight} />
                </li>
            </ul>
        </div>
    )
}