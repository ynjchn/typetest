import axios from 'axios'

const TYPER_BASE_REST_API_URL = 'http://localhost:8080/api/v1/typers';

class TyperService {
    
    getAllTypers() {
        return axios.get(TYPER_BASE_REST_API_URL)
    }

    createTyper(typer) {
        return axios.post(TYPER_BASE_REST_API_URL, typer)
    }

    updateTyper(typerId, typer) {
        return axios.put(TYPER_BASE_REST_API_URL + '/' + typerId, typer)
    }

    deleteTyper(typerId) {
        return axios.delete(TYPER_BASE_REST_API_URL + '/' + typerId)
    }
}

export default new TyperService();