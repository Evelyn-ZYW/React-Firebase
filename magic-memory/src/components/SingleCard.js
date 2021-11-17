import "./SingleCard.css";
export default function SingleCard({ key, src }) {
  return (
    <div className="card" key={key}>
      <div>
        <img className="font" src={src} alt="card front" />
        <img className="back" src="/img/cover.png" alt="cover" />
      </div>
    </div>
  );
}
