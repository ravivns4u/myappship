import { useState, useEffect } from 'react';
import axios from 'axios'

export function useUserData(url,token,userid) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    //   try {
    //    // const response = await fetch(url);
    //     const config = { headers: { "Content-Type": "application/json" }, Authorization: `Bearer ${token}`, userId : userid};
    //     const response = await axios
    //       .get(url,config)
    //     const result = await response.json();
    //     console.log(result)
    //     setData(result);
    //   } catch (err) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
        axios.get(url , { headers: {"Authorization" : `Bearer ${token}`,  userId : userid} })
        .then(res => {
        setData(res.data.data);
        })
        .catch((error) => {
        setError(error);
        })
        .finally(function () {
            setLoading(false);
         });
    };

    fetchData();
  }, [url]);

  return { data, loading, error };

}


//get Country List
export function useCountryList(url,token) {
    const [countrylist, setcountrylist] = useState(null);
    const [errorCountry, setError] = useState(null);
    const [loadingCountry, setloadingCountry] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
          axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
          .then(res => {
            setcountrylist(res.data);
          })
          .catch((error) => {
             setError(error);
          })
          .finally(function () {
            setloadingCountry(false);
         });
      };
      fetchData();
    }, [url]);

    return { countrylist, loadingCountry, errorCountry };
  }



