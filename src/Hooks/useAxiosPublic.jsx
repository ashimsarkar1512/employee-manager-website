import axios from "axios";

const axiosPublic = axios.create({
            baseURL: 'https://assignment-12-category-0007-server.vercel.app'
})
const useAxiosPublic = () => {
            return axiosPublic;
};

export default useAxiosPublic;