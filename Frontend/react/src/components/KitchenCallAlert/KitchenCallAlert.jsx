import './KitchenCallAlert.css';

export default function KitchenCallAlert({ call, resolveCall }) {
  return (
    <div className="kds-call-alert">
      <div className="kds-call-header">
        <span>#{call.asztal} Asztal</span>
        <small>{call.ido}</small>
      </div>
      <div className="kds-call-reason">{call.tipus}</div>
      <button className="kds-btn-ack" onClick={() => resolveCall(call)}>
        Nyugtázva
      </button>
    </div>
  );
}