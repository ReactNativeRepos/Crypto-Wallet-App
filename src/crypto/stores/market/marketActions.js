import axios from 'axios';

export const GET_HOLDING_BEGIN = 'GET_HOLDING_BEGIN';
export const GET_HOLDING_SUCCESS = 'GET_HOLDING_SUCCESS';
export const GET_HOLDING_FAILURE = 'GET_HOLDING_FAILURE';

export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN';
export const GET_COIN_MARKET_SUCCESS = 'GET_COIN_MARKET_SUCCESS';
export const GET_COIN_MARKET_FAILURE = 'GET_COIN_MARKET_FAILURE';

export const getHoldingsBegin = () => ({
    type: GET_HOLDING_BEGIN
});

export const getHoldingSuccess = (myHoldings) => ({
    type: GET_HOLDING_SUCCESS,
    payload: { myHoldings }
});

export const getHoldingsFailure = (error) => ({
    type: GET_HOLDING_FAILURE,
    payload: { error }
})

export function getHoldings(
    holdings = [],
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 10,
    page = 1
) {
    return dispatch => {
        dispatch(getHoldingsBegin());
        let ids = holdings.map((item) => { return item.id }).join(",");
        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

        return axios({
            baseURL: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json",

            }
        }).then((response) => {
            if (response.status === 200) {
                let myHoldings = response.data.map((item) => {
                    let coin = holdings.find(a => {
                       return a.id = item.id
                    });
                    let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01);
                    return {
                        id: item.id,
                        symbol: item.symbol,
                        name: item.name,
                        image: item.image,
                        current_price: item.current_price,
                        qty: coin.qty,
                        total: item.current_price * coin.qty,
                        price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                        holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                        sparkline_in_7d: {
                            value: item.sparkline_in_7d.price.map((price) => {
                                return price * coin.qty
                            })
                        }
                    }
                });
                dispatch(getHoldingSuccess(myHoldings))
            } else {
                dispatch(getHoldingsFailure(response.data))
            }
        }).catch((error) => {
            dispatch(getHoldingsFailure(error))
        })
    }
}


export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: { coins }
});

export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: error
});

export function getCoinMarket(
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1
) {
    return dispatch => {
        dispatch(getCoinMarketBegin);

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;
        return axios({
            url:apiUrl,
            method:'GET',
            header:{
                Accept:'application/json'
            }
        }).then((response)=>{
            if(response.status===200){
                dispatch(getCoinMarketSuccess(response.data))
            }else{
                dispatch(getCoinMarketFailure(response.data))
            }
        }).catch((error)=>{
            getCoinMarketFailure(error )
        }) 
    }
}
