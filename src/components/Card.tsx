import styles from './Card.module.scss';

interface Props {
  title: string | undefined;
  poster: string | undefined;
  director: string | undefined;
  actor: string | undefined;
  genre: string | undefined;
  plot: string | undefined;
  writer: string | undefined;
  imdbRating: string | undefined;
  imdbVote: string | undefined;
  active: boolean;
}

export const Card = ({
  title,
  poster,
  director,
  actor,
  genre,
  plot,
  writer,
  imdbRating,
  imdbVote,
  active,
}: Props) => {
  return (
    <div className={active ? `${styles.card} ${styles.active}` : styles.card}>
      <div className={styles.image}>
        <img className={styles.poster} src={poster} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{title}</h3>
        <div className={styles.tag}>
          {genre ? (
            genre.split(',').map((tag, index) => <span key={index}>{tag}</span>)
          ) : (
            <></>
          )}
        </div>
        <p className={styles.description}>{plot}</p>
        <div className={styles.list}>
          <p className={`${styles.info} ${styles.director}`}>
            Director: <span>{director}</span>
          </p>
          <p className={`${styles.info} ${styles.writer}`}>
            Writer: <span>{writer}</span>
          </p>
          <p className={`${styles.info} ${styles.star}`}>
            Actor: <span>{actor}</span>
          </p>
          <p className={`${styles.info} ${styles.rating}`}>
            IMDbRating:<span>{imdbRating}</span> ({imdbVote} votes)
          </p>
        </div>
      </div>
    </div>
  );
};
