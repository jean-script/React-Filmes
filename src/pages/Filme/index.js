import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/apis';
import './filme-info.css'
import { toast } from "react-toastify";

function Filme(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadingFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"50312f480190956cea28225ca24ca9ba",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado");
                navigate("/",{ replace: true });
                return;
            })
        }

        loadingFilme()


        return () => {
            console.log("Componente desmontado");
        }
    }, [id, navigate])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");
        
        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn("Esse filme já esta na lista");
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
        toast.success("Filme salvo com sucesso!");

    }

    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            
            <div className="area-buttons">
                <button onClick={ salvarFilme }>Salvar</button>
                <button>
                    <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title}`} >Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;