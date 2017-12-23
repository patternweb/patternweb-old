function greet(name,greeting='hello') {
  return [greeting, " ", name].join(" ")
}

/**
* adds two numbers
* @param a first number
* @param b last number
*/
function add(a:number,b=1) {
  return a+b
}

const a = add(1,1)
add(a,3)
