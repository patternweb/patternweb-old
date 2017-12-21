function distance(origin:string, target:string="LGW") {
  return 100
}

function milesTo(miles:number) {
  return {
    km: miles,
    m: miles
  }
}

function log(toLog, unit) {
  console.log([toLog, unit].join(" "))
}

log(milesTo(distance("MAN")).km, "km")
