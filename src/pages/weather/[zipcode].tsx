import { Card } from "@/components/card";
import { InputSection } from "@/components/input";
import { getForeCast } from "@/data/getForecast";
import { List } from "@/model/forecast";
import { GetServerSideProps, NextPage } from "next"
import { Fragment, useCallback, useState } from "react";

interface Props {
    data: {list: List[], city: string};
    success: boolean;
    err: string;
}
const WeatherForecast:NextPage<Props>  = ({data, success, err}: Props) => {

    const [foreCastData, setForeCastData] =  useState(data);
    const [errMsg, setErrMsg] = useState(err);
    const [loading, setLoading] = useState(false);

    const getForecastHandler = useCallback(async(zipCode: number) => {
        setErrMsg('');
        try {
            setLoading(true);           
            const response = await getForeCast(zipCode);
            setForeCastData({list: response.list, city: response?.city?.name});
            setLoading(false);
        } catch(err: any) {
            setLoading(false);
            setErrMsg(err?.message);
            setForeCastData({
                city: '',
                list: []
            });
        }
    }, [setForeCastData, setLoading, setErrMsg]);

    return (
    <div>
        <InputSection onSubmit={getForecastHandler} />
        {loading && <div><h1>Fecthcing data...</h1></div>}
        {!loading && <Fragment>
        {errMsg &&  <h1 className="ml-5 text-5xl">Error: {errMsg}</h1>}
        {!errMsg && <div className="mt-20">
            {foreCastData?.list.length > 0 ? <Fragment>
            <h1 className="text-center text-3xl">Forecast for: <b>{foreCastData?.city}</b></h1>
            {(!err && data) &&<div className="grid grid-cols-5 gap-4 m-5 text-white">
                {foreCastData?.list?.map((forecast) => {
                    const dateObj = new Date(forecast.dt_txt);
                    return (
                        <Card
                            key={forecast.dt}
                            date={dateObj.toDateString()}
                            time={dateObj.toTimeString().substr(0, 8)}
                            humidity={forecast.main.humidity}
                            temperature={forecast.main.temp}
                            visibility={forecast.visibility}
                            windSpeed={forecast.wind.speed}
                        />
                    );
                })}
            </div>}
            </Fragment> : <h1 className="ml-5 text-5xl">No data available. Please try with other zip code</h1>}
        </div>}
        </Fragment>}
    </div>);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const response = await getForeCast(90210);            
        return {
            props: {
                success: true,
                data: {
                    list: response.list as List[],
                    city: response.city.name,
                },
                err: null,
            }
        }
    } catch (err: any) {
        return {
            props: {
                success: false,
                data: null,
                err: err?.message,
            }
        }
    }
  }

  export default WeatherForecast;