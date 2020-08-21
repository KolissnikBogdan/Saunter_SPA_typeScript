export default function computeDistance(
  pathArr: any | null
) {
  let total = 0
  if (pathArr?.routes) {
    let legs = pathArr.routes[0].legs

    for (let i = 0; i < legs.length; ++i) {
      total += legs[i].distance.value
    }

    if (total < 1000) {
      return Math.round(total) + ' m';
    } else {
      return (total / 1000).toFixed(2) + ' km';
    }
  }
}
