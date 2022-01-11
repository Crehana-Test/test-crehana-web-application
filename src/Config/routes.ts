import { Country } from "../Pages/Country";
import { ListCountries } from "../Pages/ListCountries";
import IRoute from "../Interfaces/IRoute";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Countries',
        component: ListCountries    
    },
    {
        path: '/country/:code',
        name: 'Country',
        component: Country    
    },
    {
        path: '/country',
        name: 'Country',
        component: Country    
    }
];

export default routes;