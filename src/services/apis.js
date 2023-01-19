import axios from 'axios';


// url da apis
// base da api: https://api.themoviedb.org/3/
// chave api: 50312f480190956cea28225ca24ca9ba
// parametros:  movie/now_playing?api_key=50312f480190956cea28225ca24ca9ba&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;
