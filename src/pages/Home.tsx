import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="home">
      <div className="breadcrumbs">
        <div className="breadcrumbs-title">Emptea Billboards</div>
      </div>
      <div className="top-spacer"></div>
      <div className="leaderboard">
        <div className="leaderboard-content">
          <div className="leaderboard-item">
            <div className="leaderboard-item-rank"></div>
            <div className="leaderboard-item-name">Magic Eden</div>
            <button className="leaderboard-item-voter leaderboard-item-voter-up">
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button className="leaderboard-item-voter leaderboard-item-voter-down">
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
