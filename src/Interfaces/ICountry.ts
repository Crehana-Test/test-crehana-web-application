import IContinent from "./IContinent";
import ILanguage from "./ILanguage";

export default interface ICountry {
    code: string,
    name: string,
    currency: string,
    continent: IContinent,
    languages: ILanguage[],
    capital: string
}