import {useState} from 'react';
import {IWeatherDataProps} from '../interfaces/IHomeInterfaces';
import {api, api_key} from '../services/api';

export const useGetWeather = () => {
  const [data, setData] = useState<IWeatherDataProps>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getWeather = async (lat: number, long: number) => {
    try {
      setLoading(true);
      setError(false);

      const reponse = await api.get(
        `/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`,
      );

      setData(reponse.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    getWeather,
  };
};
