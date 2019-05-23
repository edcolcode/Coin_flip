import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Coin Flip</h1>

<div>
  <div>randomNumber(500)</div>
  <div>${randomNumber(80)}</div>
</div>
</br>
<div>
  <div>randomNumber(1)</div>
  <div>${randomNumber(1)}</div>
</div>
</br>
<div>
  <div>randomNumber(500)</div>
  <div>${randomNumber(500)}</div>
</div>
</br>
<div>
  <div>randomNumber(999999)</div>
  <div>${randomNumber(999999)}</div>
</div>
</br>
<div>
  <div>randomNumber(-300)</div>
  <div>${catchError(-300)}</div>
</div>
</br>
<div>
  <div>randomNumber(1000001)</div>
  <div>${catchError(1000001)}</div>
</div>
`;

function catchError(value) {
  try {
    randomNumber(value);
  } catch (e) {
    return e;
  }
}

function flip() {
  return Math.random() >= 0.5;
}

/**
 * Returns a number between [0, n)
 * 0 >= number < n
 * @param {number} n a number from 0 to 1000000. Invalid or null value
 *                  creates an error.
 */
function randomNumber(n) {
  if (!n) {
    throw Error("n value must be a provided");
  }

  if (isNaN(Number(n))) {
    throw Error("n must be a number");
  }

  if (n < 0) {
    throw Error("n must be greather or equals to 0");
  }

  if (n >= 1000000) {
    throw Error("n must be less than 1000000");
  }

  // special case that does not required calculation.
  if (n === 1) {
    return 0;
  }

  /**
   * Creates a string with a binary representation using
   * the provided flip function.
   * @param {number} length
   */
  function generateRandomBinary(length) {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += flip() ? "1" : "0";
    }

    return result;
  }

  // Calculates the posible maximun value
  const maximunValue = n - 1;

  // Gets the lenght of the binary representation of the maximunValue.
  const maxNumberBinaryRepLength = maximunValue.toString(2).length;

  let result = 0;
  do {
    // Gets the random number parsing the random generated binary representation
    result = parseInt(generateRandomBinary(maxNumberBinaryRepLength), 2);
  } while (result > maximunValue);

  return result;
}
