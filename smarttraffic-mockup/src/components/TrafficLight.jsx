export default function TrafficLight({ state = 'green' }) {
  return (
    <div className="traffic-light">
      <div className={`light ${state === 'red' ? 'red-on' : 'red-off'}`}></div>
      <div className={`light ${state === 'yellow' ? 'yellow-on' : 'yellow-off'}`}></div>
      <div className={`light ${state === 'green' ? 'green-on' : 'green-off'}`}></div>
    </div>
  )
}
