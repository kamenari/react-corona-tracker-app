import Loading from "./Loading"; 

const Results = ({ countryData, loading }) => {
    const { data, newConfirmed, totalConfirmed, newRecovered, totalRecovered, countryName } = countryData;
    return (
        <div className="results-container">
            {loading ? 
                <Loading />
                : 
                <div>
                    <p>国名: <span>{countryName}</span></p>
                    <p>日付: <span>{data.slice(0, 10)}</span></p>
                    <p>新規感染者: <span>{newConfirmed.toLocaleString()}</span></p>
                    <p>感染者総数: <span>{totalConfirmed.toLocaleString()}</span></p>
                    <p>新規回復者: <span>{newRecovered.toLocaleString()}</span></p>
                    <p>回復者総数: <span>{totalRecovered.toLocaleString()}</span></p>
                </div>
            }
        </div>
    );
};

export default Results;