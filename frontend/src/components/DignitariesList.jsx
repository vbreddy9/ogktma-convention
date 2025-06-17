import '../styles/DignitariesList.css';
import { dignitaries } from '../data/dignitaries';

const DignitariesList = () => {
  return (
    <section className="dignitaries" id='dignitaries'>
      <h2 className="section-title">Confirmed Dignitaries</h2>
      <div className="container grid">
        {dignitaries.map((d, i) => (
          <div key={i} className="card">
            <img src={d.img} alt={d.name} />
            <div className="card-info">
              <div className="title-wrapper">
                <span className="dot" />
                <h3>{d.name}</h3>
              </div>
              <p>{d.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DignitariesList;
