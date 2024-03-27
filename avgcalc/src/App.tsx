import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [numberType, setNumberType] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Fetching access token on component mount
    const fetchAccessToken = async () => {
      try {
        const { data } = await axios.post(
          "http://20.244.56.144/test/register",
          {
            companyName: "gaganprivate",
            ownerName: "Gagan",
            rollno: "1",
            ownerEmail: generateRandomEmail(), // Generate a new email for each request
            accessCode: "zpKKbc",
          }
        );
        const {
          companyName,
          clientID,
          clientSecret,
          ownerName,
          ownerEmail,
          rollNo,
        } = data;

        const authRes = await axios.post("http://20.244.56.144/test/auth", {
          companyName: companyName,
          clientID: clientID,
          clientSecret: clientSecret,
          ownerName: ownerName,
          ownerEmail: ownerEmail,
          rollNo: rollNo,
        });
        setAccessToken(authRes.data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
        setError("Failed to fetch access token");
      }
    };

    fetchAccessToken();
  }, []);
  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(7);
    return gagan${randomString}@gmail.com; // Change 'gagan' to your desired prefix
  };
  const fetchNumbers = async () => {
    try {
      const res = await axios.get(http://20.244.56.144/test/${numberType}, {
        headers: {
          Authorization: Bearer ${accessToken},
        },
      });
      setResponse(res.data.numbers);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  const handleFetch = (e) => {
    e.preventDefault();
    fetchNumbers();
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <form onSubmit={handleFetch}>
        <label>
          Number Type:
          <select
            value={numberType}
            onChange={(e) => setNumberType(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="primes">Primes</option>
            <option value="fibo">Fibonacci</option>
            <option value="even">Even</option>
            <option value="rand">Random</option>
          </select>
        </label>
        <button type="submit">Fetch Numbers</button>
      </form>
      {error && <p>Error: {error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;